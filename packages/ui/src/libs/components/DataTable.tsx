import { createColumnHelper, useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, type SortingState, type ColumnFiltersState } from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { Popover } from "./Popover"
import { FilterIcon } from "./FilterIcon"

type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}


const columnHelper = createColumnHelper<Person>();

const columns = [
	columnHelper.accessor('firstName', {
		id: 'firstName',
		header: 'First Name',
		cell: props => <>{props.row.original.firstName}</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
	columnHelper.accessor('lastName', {
		id: 'lastName',
		header: 'Last Name',
		cell: props => <>{props.row.original.lastName}</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
	columnHelper.accessor('age', {
		id: 'age',
		header: 'Age',
		cell: props => <>{props.row.original.age}</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
	columnHelper.accessor('visits', {
		id: 'visits',
		header: 'Visits',
		cell: props => <>{props.row.original.visits}</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
	columnHelper.accessor('progress', {
		id: 'progress',
		header: 'Progress',
		cell: props => <>{props.row.original.progress}%</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
	columnHelper.accessor('status', {
		id: 'status',
		header: 'Status',
		cell: props => <>{props.row.original.status}</>,
		enableSorting: true,
		enableColumnFilter: true,
		filterFn: (row, columnId, value) => {
			if (!value || value.length === 0) return true;
			return value.includes(String(row.getValue(columnId)));
		},
	}),
]

const data = [
	{
		"firstName": "Tanner",
		"lastName": "Linsley",
		"age": 33,
		"visits": 100,
		"progress": 50,
		"status": "Married"
	},
	{
		"firstName": "Kevin",
		"lastName": "Vandy",
		"age": 27,
		"visits": 200,
		"progress": 100,
		"status": "Single"
	},
	{
		"firstName": "John",
		"lastName": "Doe",
		"age": 33,
		"visits": 150,
		"progress": 75,
		"status": "Single"
	},
	{
		"firstName": "Jane",
		"lastName": "Smith",
		"age": 28,
		"visits": 100,
		"progress": 50,
		"status": "Married"
	},
	{
		"firstName": "Alice",
		"lastName": "Johnson",
		"age": 35,
		"visits": 300,
		"progress": 90,
		"status": "Divorced"
	},
	{
		"firstName": "Bob",
		"lastName": "Brown",
		"age": 27,
		"visits": 75,
		"progress": 25,
		"status": "Single"
	}
]

export const DataTable = () => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [globalFilter, setGlobalFilter] = useState('')

	// Get unique values for each column for dropdown filters
	const columnValues = useMemo(() => {
		const values: Record<string, string[]> = {}
		
		columns.forEach(col => {
			const accessor = col.accessorKey as keyof Person
			const columnId = col.id || String(accessor)
			if (accessor) {
				const uniqueValues = [...new Set(data.map(row => String(row[accessor])))]
					.filter(Boolean)
					.sort()
				values[columnId] = uniqueValues
			}
		})
		
		return values
	}, [data])

	const table = useReactTable({
		columns,
		data,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	return (
		<div className="w-full space-y-4">
			{/* Global Filter */}
			<div className="flex items-center space-x-2">
				<input
					value={globalFilter ?? ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Search all columns..."
				/>
				<span className="text-sm text-gray-500">
					{table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} rows
				</span>
			</div>
			
			<div className="overflow-x-auto shadow-lg rounded-lg">
				<table className="w-full bg-white border border-gray-200">
				<thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-widest border-r border-gray-200 last:border-r-0 hover:bg-gray-200 transition-colors duration-200 cursor-pointer select-none">
									<div className="flex flex-col space-y-1">
										<div 
											className="flex items-center space-x-1"
											onClick={header.column.getToggleSortingHandler()}
										>
											<span>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</span>
											{header.column.getCanSort() && (
												<span className="ml-1">
													{{
														asc: '↑',
														desc: '↓',
													}[header.column.getIsSorted() as string] ?? '↕'}
												</span>
											)}
										</div>
										{header.column.getCanFilter() && (
											<Popover
												trigger="click"
												placement="bottom-start"
												content={
													<div className="p-3 min-w-[200px]">
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
																	<label key={value} className="flex items-center space-x-2 text-xs hover:bg-gray-50 p-1 rounded cursor-pointer">
																		<input
																			type="checkbox"
																			checked={isChecked}
																			onChange={(e) => {
																				const currentValues = header.column.getFilterValue() as string[] || [];
																				let newValues: string[];
																				
																				if (e.target.checked) {
																					newValues = [...currentValues, value];
																				} else {
																					newValues = currentValues.filter(v => v !== value);
																				}
																				
																				header.column.setFilterValue(newValues.length > 0 ? newValues : undefined);
																			}}
																			className="text-blue-600 focus:ring-blue-500 rounded"
																		/>
																		<span>{value}</span>
																	</label>
																);
															})}
														</div>
														{columnValues[header.column.id]?.length > 0 && (
															<div className="mt-2 pt-2 border-t border-gray-200">
																<div className="flex space-x-2">
																	<button
																		onClick={() => {
																			header.column.setFilterValue(columnValues[header.column.id]);
																		}}
																		className="text-xs text-gray-600 hover:text-gray-800 font-medium"
																	>
																		Select All
																	</button>
																	<span className="text-xs text-gray-400">|</span>
																	<button
																		onClick={() => header.column.setFilterValue(undefined)}
																		className="text-xs text-gray-600 hover:text-gray-800 font-medium"
																	>
																		Deselect All
																	</button>
																</div>
															</div>
														)}
													</div>
												}
											>
												<button
													className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
													onClick={(e) => e.stopPropagation()}
												>
													<FilterIcon 
														size={14} 
														active={!!(header.column.getFilterValue() as string[])?.length} 
													/>
												</button>
											</Popover>
										)}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{table.getRowModel().rows.map(row => (
						<tr key={row.id} className="hover:bg-gray-50 transition-colors duration-200">
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			</div>
		</div>
	)
}