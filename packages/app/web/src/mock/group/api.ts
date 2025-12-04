export const api = {
	groups: {
		url: "/group",
		description: "Get all group",
		methods: "GET",
		response: "groupRes",
		query: "groupQuery",
		withOptions: false,
	},
	groupPost: {
		url: "/group",
		description: "Post data to source apps",
		methods: "POST",
		response: "groupRes",
		body: "groupBody",
		withOptions: false,
	},
	groupPatch: {
		url: "/group",
		description: "Patch data to source apps",
		methods: "PATCH",
		response: "groupRes",
		body: "groupBody",
		withOptions: false,
	},
}