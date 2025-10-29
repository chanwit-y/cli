export const api = {
	mappings: {
		url: "mapping/search",
		description: "Get all mappings",
		methods: "GET",
		response: "mappingRes",
		query: "mappingQuery",
		withOptions: false,
	},
	webHooks: {
		url: "webhook",
		description: "Get all web hooks",
		methods: "GET",
		response: "webHookRes",
		query: "webHookQuery",
		withOptions: false,
	},
	sourceApps: {
		url: "source-app",
		description: "Get all source apps",
		methods: "GET",
		response: "sourceAppRes",
		withOptions: false,
	},
	sourceAppsPost: {
		url: "source-app",
		description: "Post data to source apps",
		methods: "POST",
		response: "sourceAppRes",
		body: "sourceAppBody",
		withOptions: false,
	}
}