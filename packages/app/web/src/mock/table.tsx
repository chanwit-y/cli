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


export const initialData = [
	{
		"id": "1",
		"firstName": "Tanner",
		"lastName": "Linsley",
		"age": 33,
		"visits": 100,
		"progress": 50,
		"status": "Married"
	},
	{
		"id": "2",
		"firstName": "Kevin",
		"lastName": "Vandy",
		"age": 27,
		"visits": 200,
		"progress": 100,
		"status": "Single"
	},
	{
		"id": "3",
		"firstName": "John",
		"lastName": "Doe",
		"age": 33,
		"visits": 150,
		"progress": 75,
		"status": "Single"
	},
	{
		"id": "4",
		"firstName": "Jane",
		"lastName": "Smith",
		"age": 28,
		"visits": 100,
		"progress": 50,
		"status": "Married"
	},
	{
		"id": "5",
		"firstName": "Alice",
		"lastName": "Johnson",
		"age": 35,
		"visits": 300,
		"progress": 90,
		"status": "Divorced"
	},
	{
		"id": "6",
		"firstName": "Bob",
		"lastName": "Brown",
		"age": 27,
		"visits": 75,
		"progress": 25,
		"status": "Single"
	},
	{
		"id": "7",
		"firstName": "Emily",
		"lastName": "Davis",
		"age": 31,
		"visits": 180,
		"progress": 65,
		"status": "Married"
	},
	{
		"id": "8",
		"firstName": "Michael",
		"lastName": "Wilson",
		"age": 29,
		"visits": 220,
		"progress": 85,
		"status": "Single"
	},
	{
		"id": "9",
		"firstName": "Sarah",
		"lastName": "Miller",
		"age": 26,
		"visits": 95,
		"progress": 40,
		"status": "Single"
	},
	{
		"id": "10",
		"firstName": "David",
		"lastName": "Garcia",
		"age": 38,
		"visits": 350,
		"progress": 95,
		"status": "Married"
	},
	{
		"id": "11",
		"firstName": "Lisa",
		"lastName": "Martinez",
		"age": 32,
		"visits": 125,
		"progress": 60,
		"status": "Divorced"
	},
	{
		"id": "12",
		"firstName": "James",
		"lastName": "Anderson",
		"age": 24,
		"visits": 80,
		"progress": 30,
		"status": "Single"
	},
	{
		"id": "13",
		"firstName": "Maria",
		"lastName": "Rodriguez",
		"age": 36,
		"visits": 280,
		"progress": 88,
		"status": "Married"
	},
	{
		"id": "14",
		"firstName": "Robert",
		"lastName": "Taylor",
		"age": 41,
		"visits": 420,
		"progress": 92,
		"status": "Divorced"
	},
	{
		"id": "15",
		"firstName": "Jennifer",
		"lastName": "Thomas",
		"age": 30,
		"visits": 160,
		"progress": 70,
		"status": "Single"
	},
	{
		"id": "16",
		"firstName": "William",
		"lastName": "Jackson",
		"age": 25,
		"visits": 90,
		"progress": 35,
		"status": "Single"
	},
	{
		"id": "17",
		"firstName": "Amanda",
		"lastName": "White",
		"age": 34,
		"visits": 240,
		"progress": 80,
		"status": "Married"
	},
	{
		"id": "18",
		"firstName": "Christopher",
		"lastName": "Harris",
		"age": 37,
		"visits": 310,
		"progress": 87,
		"status": "Divorced"
	},
	{
		"id": "19",
		"firstName": "Jessica",
		"lastName": "Clark",
		"age": 28,
		"visits": 140,
		"progress": 55,
		"status": "Single"
	},
	{
		"id": "20",
		"firstName": "Daniel",
		"lastName": "Lewis",
		"age": 39,
		"visits": 380,
		"progress": 93,
		"status": "Married"
	},
	{
		"id": "21",
		"firstName": "Ashley",
		"lastName": "Walker",
		"age": 26,
		"visits": 110,
		"progress": 45,
		"status": "Single"
	},
	{
		"id": "22",
		"firstName": "Matthew",
		"lastName": "Hall",
		"age": 33,
		"visits": 190,
		"progress": 72,
		"status": "Married"
	},
	{
		"id": "23",
		"firstName": "Stephanie",
		"lastName": "Allen",
		"age": 31,
		"visits": 170,
		"progress": 68,
		"status": "Divorced"
	},
	{
		"id": "24",
		"firstName": "Anthony",
		"lastName": "Young",
		"age": 29,
		"visits": 130,
		"progress": 58,
		"status": "Single"
	},
	{
		"id": "25",
		"firstName": "Michelle",
		"lastName": "King",
		"age": 35,
		"visits": 260,
		"progress": 82,
		"status": "Married"
	},
	{
		"id": "26",
		"firstName": "Joshua",
		"lastName": "Wright",
		"age": 27,
		"visits": 105,
		"progress": 42,
		"status": "Single"
	},
	{
		"id": "27",
		"firstName": "Kimberly",
		"lastName": "Lopez",
		"age": 32,
		"visits": 200,
		"progress": 75,
		"status": "Divorced"
	},
	{
		"id": "28",
		"firstName": "Andrew",
		"lastName": "Hill",
		"age": 40,
		"visits": 400,
		"progress": 90,
		"status": "Married"
	},
	{
		"id": "29",
		"firstName": "Nicole",
		"lastName": "Scott",
		"age": 28,
		"visits": 145,
		"progress": 62,
		"status": "Single"
	},
	{
		"id": "30",
		"firstName": "Ryan",
		"lastName": "Green",
		"age": 26,
		"visits": 85,
		"progress": 38,
		"status": "Single"
	},
	{
		"id": "31",
		"firstName": "Elizabeth",
		"lastName": "Adams",
		"age": 34,
		"visits": 230,
		"progress": 78,
		"status": "Married"
	},
	{
		"id": "32",
		"firstName": "Brandon",
		"lastName": "Baker",
		"age": 30,
		"visits": 175,
		"progress": 66,
		"status": "Single"
	},
	{
		"id": "33",
		"firstName": "Megan",
		"lastName": "Gonzalez",
		"age": 29,
		"visits": 155,
		"progress": 64,
		"status": "Divorced"
	},
	{
		"id": "34",
		"firstName": "Jason",
		"lastName": "Nelson",
		"age": 36,
		"visits": 290,
		"progress": 84,
		"status": "Married"
	},
	{
		"id": "35",
		"firstName": "Rachel",
		"lastName": "Carter",
		"age": 25,
		"visits": 95,
		"progress": 41,
		"status": "Single"
	},
	{
		"id": "36",
		"firstName": "Justin",
		"lastName": "Mitchell",
		"age": 31,
		"visits": 185,
		"progress": 71,
		"status": "Single"
	},
	{
		"id": "37",
		"firstName": "Samantha",
		"lastName": "Perez",
		"age": 33,
		"visits": 210,
		"progress": 76,
		"status": "Married"
	},
	{
		"id": "38",
		"firstName": "Kevin",
		"lastName": "Roberts",
		"age": 28,
		"visits": 120,
		"progress": 52,
		"status": "Single"
	},
	{
		"id": "39",
		"firstName": "Laura",
		"lastName": "Turner",
		"age": 37,
		"visits": 320,
		"progress": 89,
		"status": "Divorced"
	},
	{
		"id": "40",
		"firstName": "Steven",
		"lastName": "Phillips",
		"age": 42,
		"visits": 450,
		"progress": 96,
		"status": "Married"
	},
	{
		"id": "41",
		"firstName": "Amy",
		"lastName": "Campbell",
		"age": 27,
		"visits": 115,
		"progress": 48,
		"status": "Single"
	},
	{
		"id": "42",
		"firstName": "Brian",
		"lastName": "Parker",
		"age": 35,
		"visits": 270,
		"progress": 83,
		"status": "Married"
	},
	{
		"id": "43",
		"firstName": "Heather",
		"lastName": "Evans",
		"age": 30,
		"visits": 165,
		"progress": 67,
		"status": "Divorced"
	},
	{
		"id": "44",
		"firstName": "Mark",
		"lastName": "Edwards",
		"age": 38,
		"visits": 340,
		"progress": 91,
		"status": "Married"
	},
	{
		"id": "45",
		"firstName": "Crystal",
		"lastName": "Collins",
		"age": 26,
		"visits": 100,
		"progress": 43,
		"status": "Single"
	},
	{
		"id": "46",
		"firstName": "Eric",
		"lastName": "Stewart",
		"age": 32,
		"visits": 195,
		"progress": 73,
		"status": "Single"
	},
	{
		"id": "47",
		"firstName": "Angela",
		"lastName": "Sanchez",
		"age": 29,
		"visits": 150,
		"progress": 61,
		"status": "Married"
	},
	{
		"id": "48",
		"firstName": "Scott",
		"lastName": "Morris",
		"age": 34,
		"visits": 250,
		"progress": 79,
		"status": "Divorced"
	},
	{
		"id": "49",
		"firstName": "Rebecca",
		"lastName": "Rogers",
		"age": 31,
		"visits": 180,
		"progress": 69,
		"status": "Single"
	},
	{
		"id": "50",
		"firstName": "Gregory",
		"lastName": "Reed",
		"age": 39,
		"visits": 370,
		"progress": 94,
		"status": "Married"
	}
]