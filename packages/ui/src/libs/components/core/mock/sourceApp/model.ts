import { ModelFactory, type TModelMaster } from "../../../../model/master";

const base = ModelFactory.base({
  pagination: {
    type: "object",
    collection: {
      page: "number",
      limit: "number",
      total: "number",
      totalPages: "number",
    },
  },
})


export const model: TModelMaster = {
	mappingRes: {
		data: {
			type: "array",
			collection: {
				id: "number",
				mappingName: "string",
				alias: "string",
			},
		},
		status: "number",
		success: "boolean",
		message: "string",
	},
	mappingQuery: {
		offset: "number",
		limit: "number",
		userId: "string"
	}
}