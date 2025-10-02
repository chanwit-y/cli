import { TextField } from "./TextField"
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { useState } from "react"
import { ArrowDown, ArrowDownUp, ArrowUp, Download, ListFilter, Plus, SendToBack } from "lucide-react"
import Icon from "./Icon"
import * as Popover from "@radix-ui/react-popover"

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
								<SendToBack className="w-4 h-4" />
							</th>
							{headerGroup.headers.map(header => (
								header.column.columnDef.header && <th key={header.id} className="py-4  border-r border-gray-200 last:border-r-0 transition-colors duration-200 select-none">
									<div className="flex flex-row gap-2 items-center justify-center">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && (
											<span className="transition-all duration-300 ease-in-out">
												{{
													asc: <Icon icon={ArrowUp} size={14} className="animate-bounce" />,
													desc: <Icon icon={ArrowDown} size={14} className="animate-bounce" />,
												}[header.column.getIsSorted() as string] ?? <Icon icon={ArrowDownUp} size={14} className="opacity-60 hover:opacity-100 transition-opacity duration-200" />}
											</span>
										)}
										{header.column.getCanFilter() && (
											<Popover.Root>
												<Popover.Trigger asChild>
													<Icon onClick={(e) => e.stopPropagation()} icon={ListFilter} size={14} className="cursor-pointer" />
												</Popover.Trigger>
												<Popover.Portal>
													<Popover.Content
														className="min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
														side="bottom"
														align="center"
														sideOffset={5}
													>
														<div>HI</div>
														{/* <Popover.Arrow className="fill-white" /> */}
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
			</table>
		</div>
	</div>)
}