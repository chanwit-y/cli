export const api = {
	mappings: {
		url: "mapping/search",
		description: "Get all mappings",
		methods: "GET",
		response: "mappingRes",
		query: "mappingQuery",
		withOptions: false,
	},
	sourceApps: {
		url: "source-app",
		description: "Get all source apps",
		methods: "GET",
		response: "sourceAppRes",
		withOptions: false,
	}
}