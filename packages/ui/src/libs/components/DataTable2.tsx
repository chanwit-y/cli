import { TextField } from "./TextField"
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type PaginationState, getPaginationRowModel, type SortingState, getSortedRowModel, type ColumnFiltersState } from "@tanstack/react-table"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, ArrowDownUp, ArrowUp, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ListFilter } from "lucide-react"
import Icon from "./Icon"
import * as Popover from "@radix-ui/react-popover"
import { Text } from "@radix-ui/themes"
import type { DataTableProps } from "./@types"
import { useCore } from "./core/context"

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
	apiInfo,
	columns = [],
	canSearchAllColumns = false,
}: DataTableProps<T>) => {
	const { getDataValue } = useCore()
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

	const columnValues = useMemo(() => {
		const values: Record<string, string[]> = {}
		columns.forEach(col => {
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
	}, [data])

	const filterRef = useRef<HTMLInputElement>(null);

	const table = useReactTable({
		data,
		columns,
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


	useEffect(() => {
		// TODO: get value
		console.log('call api', apiInfo)

		// const query = Object.entries(apiInfo?.query ?? {}).reduce((acc, [key, value]) => {
		// 	return { ...acc, [key]: value }
		// }, {})



		api && api().then((res) => {
			setData(res.data)
		})
	}, [api, apiInfo])

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
		<div className="datatable-header">
			<div className="datatable-title">{title}</div>

			{canSearchAllColumns && (
				<div className="datatable-controls-wrapper">
					<TextField
						ref={filterRef}
						width={200}
						placeholder="Search all columns..."
						value={globalFilter ?? ''}
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
								header.column.columnDef.header && <th key={header.id} className="datatable-header-cell hover:bg-blue-300 cursor-pointer">
									<div className="datatable-header-content" >
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && (
											<span className="datatable-sort-icon" onClick={header.column.getToggleSortingHandler()}>
												{{
													asc: <Icon icon={ArrowUp} size={14} className="datatable-sort-icon-bounce" />,
													desc: <Icon icon={ArrowDown} size={14} className="datatable-sort-icon-bounce" />,
												}[header.column.getIsSorted() as string] ?? <Icon icon={ArrowDownUp} size={14} className="datatable-sort-icon-default" />}

											</span>
										)}
										{header.column.getCanFilter() && (
											<Popover.Root>
												<Popover.Trigger asChild>
													<Icon onClick={(e) => e.stopPropagation()} icon={ListFilter} size={14} className="datatable-filter-icon" />
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
					{table.getPaginationRowModel().rows.map(row => (
						<tr key={row.id} className="datatable-body-row hover:bg-blue-50">
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className="datatable-body-cell">
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
	</div>)
}