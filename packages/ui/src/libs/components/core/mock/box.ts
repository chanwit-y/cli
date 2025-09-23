import type { Box } from "../../@types";

export const variables = {}

export const initLoad = {}

export const boxs: Box[] = [
			{
				sm: "12",
				md: "6",
				lg: "4",
				xl: "3",
				element: {
					name: "test",
					dataType: "string",
					canObserve: true,
					isRequired: true,
					keys: {
						id: "id",
						search: "title",
						display: "title",
					},
					api: {
						name: "todos",
						params: {},
					},
				}
			},
			{
				sm: "12",
				md: "6",
				lg: "4",
				xl: "3",
			},
			{
				sm: "6",
				md: "6",
				lg: "6",
				xl: "6",
			},
			{
				sm: "6",
				md: "6",
				lg: "6",
				xl: "6",
				container: {
					name: "container",
					isAaary: false,
					boxs: [
						{
							sm: "6",
							md: "6",
							lg: "6",
							xl: "6",
						},
						{
							sm: "6",
							md: "6",
							lg: "6",
							xl: "6",
						},
					],
				}
			},
		]