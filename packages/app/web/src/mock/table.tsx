import { createColumnHelper } from "@tanstack/react-table"

type Person = {
	id: string
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}

const columnHelper = createColumnHelper<Person>();

export const columns = [
	columnHelper.display({
		id: 'drag-handle',
		header: '',
		cell: () => null, // The drag handle will be rendered in DraggableRow
		size: 40,
		enableSorting: false,
		enableColumnFilter: false,
	}),
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