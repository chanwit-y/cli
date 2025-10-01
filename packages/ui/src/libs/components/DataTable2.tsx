import { TextField } from "./TextField"
import { useReactTable, getCoreRowModel, getFilteredRowModel, createColumnHelper, flexRender } from "@tanstack/react-table"
import { useState } from "react"
import { ArrowDownUp, Download, Plus, Search, Trash2 } from "lucide-react"
import Icon from "./Icon"

interface Props<T extends Record<string, any>> {
	data?: T[]
	columns?: any[]
}

export const DataTable2 = <T extends Record<string, any>>({ data = [], columns = [] }: Props<T>) => {
	const [globalFilter, setGlobalFilter] = useState('')

	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	return (<div className="">
		<div className="flex flex-row justify-between items-center">
			<div className="text-2xl text-gray-500 font-semibold">[Table]</div>

			<div className="flex flex-col w-full gap-0.5 items-end justify-end">

				<div className="flex flex-row gap-0.5 items-center justify-center space-x-2">

					<Icon
						icon={Plus}
						size={20}
						color="#2b7fff"
						strokeWidth={2}
						className="p-1 hover:scale-110 transition-transform cursor-pointer text-gray-500 border hover:ring-1 hover:ring-blue-400 rounded-sm border-blue-500 hover:bg-gray-50"
					/>
					<Icon
						icon={Download}
						color="#2b7fff"
						size={20}
						strokeWidth={2}
						className="p-1 hover:scale-110 transition-transform cursor-pointer text-gray-500 border hover:ring-1 hover:ring-blue-400 rounded-sm border-blue-500 hover:bg-gray-50"
					/>
					{/* <Icon
						icon={Trash2}
						size={20}
						color="red"
						strokeWidth={2}
						className="p-1  hover:scale-110 transition-transform cursor-pointer text-gray-500 border hover:ring-1 hover:ring-red-400 rounded-sm border-red-500 hover:bg-gray-50"
					/> */}

					{/* <Icon
						icon={Search}
						size={20}
						strokeWidth={2}
						className="p-1 hover:scale-110 transition-transform cursor-pointer text-gray-500 border hover:ring-1 hover:ring-gray-400 rounded-sm border-gray-500 hover:bg-gray-50"
					/> */}
					<TextField
						width={200}
						placeholder="Search all columns..."
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)} />

				</div>
				<span className="text-xs text-gray-500">
					{table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} total rows
				</span>
			</div>
		</div>

		<div className="my-1 overflow-x-auto shadow-lg rounded-lg">
			<table className="w-full bg-white border border-gray-200">
				<thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">

					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id} className="text-center text-xs font-bold text-gray-700 uppercase tracking-widest">
							<th className="py-4 border-r border-gray-200 flex justify-center items-center">
								<ArrowDownUp className="w-4 h-4" />
							</th>
							{headerGroup.headers.map(header => (
								header.column.columnDef.header && <th key={header.id} className="py-4  border-r border-gray-200 last:border-r-0 transition-colors duration-200 select-none">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
			</table>
		</div>
	</div>)
}