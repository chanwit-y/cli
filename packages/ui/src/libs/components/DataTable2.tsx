import { TextField } from "./TextField"
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type PaginationState, getPaginationRowModel, type SortingState, getSortedRowModel, type ColumnFiltersState, type ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import Icon from "./Icon"
import * as Popover from "@radix-ui/react-popover"
import { Button, Text } from "@radix-ui/themes"
import type { ButtonAction, DataTableProps } from "./@types"
import { useStord } from "./core/stord"
import { Modal } from "./Modal"
import { useQuery } from "@tanstack/react-query"
import { ConfirmBox } from "./ConfirmBox"
import { useSnackbar } from "./Snackbar"
import { useLoading } from "./context"

// Utility function to highlight matching text
const highlightText = (text: string, searchTerm: string) => {
	if (!searchTerm || !text) {
		return <>{text}</>
	}

	const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
	const parts = text.split(regex)

	return (
		<>
			{parts.map((part, index) =>
				regex.test(part) ? (
					<mark key={index} className="bg-yellow-200 px-1 rounded">
						{part}
					</mark>
				) : (
					part
				)
			)}
		</>
	)
}

// Enhanced cell renderer with highlighting support
const renderCellWithHighlight = (cell: any, globalFilter: string) => {
	const cellValue = cell.getValue()
	const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext())

	// If there's a global filter and the cell value is a string, highlight it
	if (globalFilter && typeof cellValue === 'string') {
		return highlightText(cellValue, globalFilter)
	}

	// For custom cell renderers, try to extract text content and highlight
	if (globalFilter && cellContent && typeof cellContent === 'object' && 'props' in cellContent) {
		// If it's a React element with children, try to highlight text content
		if (cellContent.props && cellContent.props.children) {
			const children = cellContent.props.children
			if (typeof children === 'string') {
				return highlightText(children, globalFilter)
			}
		}
	}

	return cellContent
}


export const DataTable2 = <T extends Record<string, any>>({
	title,
	api,
	apiDeleteInfo,
	apiDelete,
	apiInfo,
	columns = [],
	canSearchAllColumns = false,
	modalContainer,
	modalMaxWidth,
	modalMinWidth,
	canEdit = false,
	canDelete = false,
	align = {},

	// editModalContainer,
}: DataTableProps) => {

	// const {
	// 	updateLoadDataTables,
	// 	updateSelectedRow,
	// } = useStord((state) => ({
	// 	updateLoadDataTables: state.updateLoadDataTables,
	// 	updateSelectedRow: state.updateSelectedRow,
	// }))

	const [openModal, setOpenModal] = useState(false)
	const [openConfirmBox, setOpenConfirmBox] = useState(false)

	const updateLoadDataTables = useStord((state) => state.updateFnCtxs)
	const updateSelectedRow = useStord((state) => state.updateContextData)

	const [data, setData] = useState<T[]>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})
	const [isPageChanging, setIsPageChanging] = useState(false)
	const [isFiltering, setIsFiltering] = useState(false)
	const prevPageIndexRef = useRef(pagination.pageIndex)
	const prevColumnFiltersRef = useRef(columnFilters)

	const [selectedRow, setSelectedRow] = useState<T | null>(null)

	const { showSnackbar } = useSnackbar()
	const { startLoading, stopLoading } = useLoading()

	const columnValues = useMemo(() => {
		const values: Record<string, string[]> = {}
		columns.forEach((col: { accessorKey: string; id: string }) => {
			// Skip display columns like drag-handle
			if ('accessorKey' in col && col.accessorKey) {
				const accessor = col.accessorKey as string
				const columnId = col.id || accessor
				const uniqueValues = [...new Set(data.map(row => String(row[accessor])))]
					.filter(Boolean)
					.sort()
				values[columnId] = uniqueValues
			}
		})
		return values
	}, [columns, data])


	const executeActions = useCallback(async (
		actionsToExecute: ButtonAction[] = [],
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		let loaderId: string | undefined;

		for (const action of actionsToExecute) {
			switch (action) {
				case 'SubmitFormToDeleteAPI':
					console.log('selectedRow', selectedRow)
					console.log('apiDeleteInfo', apiDeleteInfo)
					console.log('apiDelete', apiDelete)
					if (apiDeleteInfo && selectedRow && apiDeleteInfo.params?.id && selectedRow[apiDeleteInfo.params.id] && apiDelete) {
						console.log('apiDelete', apiDelete)
						await apiDelete({ id: selectedRow[apiDeleteInfo.params.id] })
					}
					// if (selectedRow?.id) {
					// 	api && await api({ id: data.id }, { ...data })
					// } else {
					// 	api && await api({ ...data })
					// }
					break;
				case 'ReloadDataTable':
					await refetch();
					// await loadDataTables["Source Apps"]()
					break;
				// case 'ClearCurrentFormSeleted':
				// 	clearCurrentFormSeleted();
				// 	break;
				case 'StratLoading':
					loaderId = startLoading();
					break;
				case 'StopLoading':
					loaderId && stopLoading(loaderId);
					break;
				case 'CloseModal':
					setOpenModal(false);
					break;
				default:
					break;
			}
		}

		// if (event && onClick) {
		// 	onClick(event);
		// }

		if (apiDeleteInfo?.snackbarSuccess) {
			showSnackbar({
				variant: apiDeleteInfo?.snackbarSuccess.type,
				message: apiDeleteInfo?.snackbarSuccess.message,
			})
		}
	}, [apiDeleteInfo, apiDelete, showSnackbar, selectedRow])
	// }, [api, handleSubmit, loadDataTables, onClick, showSnackbar, snackbarSuccess, startLoading, stopLoading])


	const handleConfirm = useCallback((isConfirm: boolean) => {
		console.log('handleConfirm', selectedRow)
		if (isConfirm) {
			executeActions(apiDeleteInfo?.confirmBox?.True || [])
		} else {
			executeActions(apiDeleteInfo?.confirmBox?.False || [])
		}
	}, [apiDeleteInfo, selectedRow])

	const filterRef = useRef<HTMLInputElement>(null);

	// Prepend a default display column with an icon
	const enhancedColumns = useMemo<ColumnDef<T, unknown>[]>(() => {
		const actionIconColumn: ColumnDef<T, unknown> = {
			id: '__icon__',
			header: () => (
				<></>
			),
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-1">
					{
						canEdit && (<Button
							className="inline-flex items-center justify-center w-4 h-4"
							onClick={() => {
								// eslint-disable-next-line no-console
								console.log(row.original)
								updateSelectedRow(title ?? '', row.original)
								setOpenModal(true)
							}}
						>
							<Icon icon="edit" size={14} />
						</Button>)
					}
					{
						canDelete && (
							<Button
								className="inline-flex items-center justify-center w-4 h-4"
								color="red"
								onClick={() => {
									console.log(row.original)
									setSelectedRow(row.original)
									setOpenConfirmBox(true)
									// console.log(row.original)
									// updateSelectedRow(`selected-row-${title ?? ''}`, row.original)

								}}
							>
								<Icon icon="trash" size={14} />
							</Button>
						)
					}
				</div>

			)
			,
			enableSorting: false,
			enableColumnFilter: false,
			size: 50,
		}

		return canEdit || canDelete ? [actionIconColumn, ...columns] : [...columns]
	}, [title, columns, canDelete, canEdit])

	// const align = useMemo(() => {
	// 	console.log('align', columns)
	// 	const x = columns.reduce((acc, current) => {
	// 		return { ...acc, [current.accessor]: current.align }
	// 	}, {})
	// 	console.log('align', x)
	// 	return x
	// }, [columns])


	// const { setValue } = useFormContext()

	const table = useReactTable({
		data,
		columns: enhancedColumns,
		state: {
			globalFilter,
			pagination,
			sorting,
			columnFilters,
		},
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onPaginationChange: setPagination,
		manualPagination: false,
	})


	const fechtData = useCallback(async () => {

		const q = Object.entries(apiInfo?.query ?? {}).reduce((acc, [key, value]) => {
			return { ...acc, [key]: value.type === "value" ? value.value : undefined }
		}, {})

		if (api) {
			const result = await api({ ...q })
			let data = result
			apiInfo?.paths?.forEach((path) => {
				data = data[path]
			})
			// setData(data ?? [])
			return data ?? []
		}
		return []

		// api && api({ ...q }).then((res: any) => {
		// 	let data = res
		// 	apiInfo?.paths?.forEach((path) => {
		// 		data = data[path]
		// 	})
		// 	// setData(data ?? [])
		// 	return data ?? []
		// })
		// return []
	}, [api, apiInfo])

	const { data: tableData, refetch, isLoading, isFetching } = useQuery({ queryKey: [`table-data-${title}`], queryFn: fechtData })

	const showSkeleton = (isLoading || isFetching) && data.length === 0
	const visibleColumns = table.getVisibleLeafColumns()

	useEffect(() => {
		console.log('tableData', tableData)
		setData(tableData ?? [])
	}, [tableData])


	useEffect(() => {
		updateLoadDataTables(title ?? '', refetch)
		// updateLoadDataTables({ [title ?? '']: fechtData })
	}, [title, refetch, updateLoadDataTables])


	useEffect(() => {
		// TODO: get value
		// console.log('call api', apiInfo)

		// const query = Object.entries(apiInfo?.query ?? {}).reduce((acc, [key, value]) => {
		// 	return { ...acc, [key]: value }
		// }, {})



		// api && api().then((res: { data: SetStateAction<T[]> }) => {
		// 	setData(res.data)
		// })
		// fechtData();
		refetch();
	}, [api, apiInfo, refetch])

	useEffect(() => {
		filterRef.current?.focus()
	}, [filterRef])

	// Handle page change animation
	useEffect(() => {
		if (prevPageIndexRef.current !== pagination.pageIndex) {
			setIsPageChanging(true)
			prevPageIndexRef.current = pagination.pageIndex

			const timer = setTimeout(() => {
				setIsPageChanging(false)
			}, 300) // Match this with CSS animation duration

			return () => clearTimeout(timer)
		}
	}, [pagination.pageIndex])

	// Handle filter change animation
	useEffect(() => {
		const hasFilterChanged = JSON.stringify(prevColumnFiltersRef.current) !== JSON.stringify(columnFilters)

		if (hasFilterChanged && columnFilters.length >= 0) {
			setIsFiltering(true)
			prevColumnFiltersRef.current = columnFilters

			const timer = setTimeout(() => {
				setIsFiltering(false)
			}, 400) // Slightly longer animation for filter effect

			return () => clearTimeout(timer)
		}
	}, [columnFilters])

	return (<div className="datatable-container">
		{/* <pre>{JSON.stringify(align, null, 2)}</pre> */}
		<div className="datatable-header">
			<div className="datatable-title">{title}</div>

			{canSearchAllColumns && (
				<div className="datatable-controls-wrapper">
					<TextField
						ref={filterRef}
						width={200}
						placeholder="Search all columns..."
						value={globalFilter ?? ''}
						isFixedHeight={false}
						onChange={(e) => setGlobalFilter(e.target.value)} />

					<span className="datatable-row-count">
						{table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} total rows
					</span>
				</div>
			)}
		</div>

		<div className="datatable-table-wrapper">
			<table className="datatable-table">
				<thead className="datatable-thead">

					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id} className="datatable-header-row">
							{/* <th className="datatable-header-cell-icon">
								<SendToBack className="w-4 h-4" />
							</th> */}
							{headerGroup.headers.map(header => (
								header.column.columnDef.header && <th key={header.id} className="datatable-header-cell hover:bg-blue-300 cursor-pointer" style={{ width: header.getSize() }}>
									<div className="datatable-header-content" >
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && (
											<span className="datatable-sort-icon" onClick={header.column.getToggleSortingHandler()}>
												{{
													asc: <Icon icon="arrowUp" size={14} className="datatable-sort-icon-bounce" />,
													desc: <Icon icon="arrowDown" size={14} className="datatable-sort-icon-bounce" />,
												}[header.column.getIsSorted() as string] ?? <Icon icon="arrowDownUp" size={14} className="datatable-sort-icon-default" />}

											</span>
										)}
										{header.column.getCanFilter() && (
											<Popover.Root>
												<Popover.Trigger asChild>
													<Icon onClick={(e) => e.stopPropagation()} icon="listFilter" size={14} className="datatable-filter-icon" />
												</Popover.Trigger>
												<Popover.Portal>
													<Popover.Content
														className="datatable-popover-content"
														side="bottom"
														align="center"
														sideOffset={5}
													>
														<div className="p-1 bg-white ">
															<div className="flex items-center justify-between mb-3">
																<div className="text-xs font-medium text-gray-700">
																	Filter {typeof header.column.columnDef.header === 'function' ? header.column.columnDef.header(header.getContext()) : header.column.columnDef.header}
																</div>
																<button
																	onClick={() => header.column.setFilterValue(undefined)}
																	className="text-xs text-blue-600 hover:text-blue-800 font-medium"
																>
																	Clear All
																</button>


															</div>
															<div className="space-y-1 max-h-48 overflow-y-auto">
																{columnValues[header.column.id]?.map((value) => {
																	const currentFilter = header.column.getFilterValue() as string[] || [];
																	const isChecked = currentFilter.includes(value);

																	return (
																		<div key={value} className="flex  p-1 hover:bg-gray-50 rounded">
																			<input
																				type="checkbox"
																				checked={isChecked}
																				className="mr-2"
																				onChange={(e) => {
																					const checked = e.target.checked;
																					const currentValues = header.column.getFilterValue() as string[] || [];
																					let newValues: string[];

																					if (checked) {
																						newValues = [...currentValues, value];
																					} else {
																						newValues = currentValues.filter(v => v !== value);
																					}


																					header.column.setFilterValue(newValues.length > 0 ? newValues : undefined);
																				}}
																			/>
																			<Text as="span" size="3">
																				{value}
																			</Text>
																		</div>
																	);
																})}
															</div>
															{columnValues[header.column.id]?.length > 0 && (
																<div className="mt-2 pt-2 border-t border-gray-200">
																	<div className="flex space-x-2 justify-around">
																		<button
																			onClick={() => {
																				header.column.setFilterValue(columnValues[header.column.id]);
																			}}
																			className=" text-xs text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
																		>
																			Select All
																		</button>
																		<span className="text-xs text-gray-400">|</span>
																		<button
																			onClick={() => header.column.setFilterValue(undefined)}
																			className=" text-xs text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
																		>
																			Deselect All
																		</button>
																	</div>
																</div>
															)}
														</div>
														<Popover.Arrow className="fill-white" />
													</Popover.Content>
												</Popover.Portal>
											</Popover.Root>
										)}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody className={`datatable-tbody ${isPageChanging ? 'page-changing' : ''} ${isFiltering ? 'filtering' : ''}`}>
					{showSkeleton
						? Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
							<tr key={`skeleton-${rowIndex}`} className="datatable-body-row">
								{visibleColumns.map((column, columnIndex) => (
									<td
										key={`skeleton-cell-${column.id}-${columnIndex}`}
										className="datatable-body-cell px-4"
										style={{ width: column.getSize(), textAlign: align[column.id] }}
									>
										<div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
									</td>
								))}
							</tr>
						))
						: table.getPaginationRowModel().rows.map(row => (
							<tr key={row.id} className="datatable-body-row hover:bg-blue-50">
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className="datatable-body-cell px-4" style={{ width: cell.column.getSize(), textAlign: align[cell.column.id] }}>
										{renderCellWithHighlight(cell, globalFilter)}
									</td>
								))}
							</tr>
						))}
				</tbody>
				<tfoot className="flex items-center justify-between px-2 py-4 bg-white border-t border-gray-200">
					<div className="flex items-center space-x-6 text-sm text-gray-700">
						<div className="flex items-center space-x-2">
							<span>Rows per page:</span>
							<select
								value={table.getState().pagination.pageSize}
								onChange={e => {
									table.setPageSize(Number(e.target.value))
								}}
								className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-300"
							>
								{[5, 10, 20, 30, 40, 50].map(pageSize => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>
						<div>
							Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
							{Math.min(
								(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
								table.getFilteredRowModel().rows.length
							)}{' '}
							of {table.getFilteredRowModel().rows.length} entries
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<button
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
							className="px-2 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<ChevronFirst className="w-4 h-4" />
						</button>
						<button
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="px-2 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>

						<div className="flex items-center space-x-1">
							{(() => {
								const currentPage = table.getState().pagination.pageIndex + 1;
								const totalPages = table.getPageCount();
								const pages = [];

								// Always show first page
								if (totalPages > 0) pages.push(1);

								// Show pages around current page
								const start = Math.max(2, currentPage - 1);
								const end = Math.min(totalPages - 1, currentPage + 1);

								// Add ellipsis if there's a gap
								if (start > 2) pages.push('...');

								// Add pages around current
								for (let i = start; i <= end; i++) {
									if (i !== 1 && i !== totalPages) pages.push(i);
								}

								// Add ellipsis if there's a gap
								if (end < totalPages - 1) pages.push('...');

								// Always show last page
								if (totalPages > 1) pages.push(totalPages);

								return pages.map((page, index) => (
									page === '...' ? (
										<span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">
											...
										</span>
									) : (
										<button
											key={page}
											onClick={() => table.setPageIndex(Number(page) - 1)}
											className={`px-3 py-1 text-sm cursor-pointer border rounded transition-colors ${currentPage === page
												? 'bg-blue-300 text-white ring-1 ring-blue-300'
												: 'border-gray-300 hover:bg-gray-50'
												}`}
										>
											{page}
										</button>
									)
								));
							})()}
						</div>

						<button
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="px-2 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
						<button
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
							className="px-2 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<ChevronLast className="w-4 h-4" />
						</button>
					</div>
				</tfoot>
			</table>
		</div>

		<Modal
			id="modalDatable"
			open={openModal}
			onOpenChange={(open) => {
				console.log('datatable', open)
				setOpenModal(open);
			}}
			hiddenTrigger={true}
			maxWidth={modalMaxWidth}
			minWidth={modalMinWidth}
		>
			{modalContainer}
		</Modal>
		<ConfirmBox
			id="confirmBox"
			open={openConfirmBox}
			onOpenChange={() => setOpenConfirmBox(!openConfirmBox)}
			onConfirm={handleConfirm}
			title="Delete item"
			description="This action cannot be undone. Are you sure you want to continue?"
		/>
	</div>)
}