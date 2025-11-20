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
});

export const model: TModelMaster = {
  groupRes: {
    data: {
      type: "array",
      collection: {
        id: "number",
        name: "string",
        code: "string",
      },
    },
    status: "number",
    success: "boolean",
    message: "string",
  },
  groupQuery: {
    offset: "number",
    limit: "number",
    userId: "string",
  },
  groupBody: {
    name: "string",
    code: "number",
    userId: "string",
  },
};
