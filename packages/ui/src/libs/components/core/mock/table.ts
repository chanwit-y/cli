export const Table = {
  name: "table",
  columns: [
	{
		accessor: "firstName",
		header: "First Name",
		enablesSorting: true,
		enablesColumnFilter: true,
	}
  ],
  api: {
    name: "seam",
  },
};
