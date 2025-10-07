import type { DataTableElement } from "../../@types";

export const Table: DataTableElement = {
  name: "table",
  columns: [
	{
		accessor: "firstName",
		header: "First Name",
		enableSorting: true,
		enableColumnFilter: true,
	},
	{
		accessor: "lastName",
		header: "Last Name",
		enableSorting: true,
		enableColumnFilter: true,
	},
	{
		accessor: "age",
		header: "Age",
		enableSorting: true,
		enableColumnFilter: true,
	},
	{
		accessor: "visits",
		header: "Visits",
		enableSorting: true,
		enableColumnFilter: true,
	},
	{
		accessor: "progress",
		header: "Progress",
		enableSorting: true,
		enableColumnFilter: true,
	},
	{
		accessor: "status",
		header: "Status",
		enableSorting: true,
		enableColumnFilter: true,
	},
  ],
  api: {
    name: "users",
  },
};
