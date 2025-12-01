import { type TModelMaster, ModelFactory } from "vegaui";

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
  companyRes: {
    data: {
      type: "array",
      collection: {
        id: "number",
        name: "string",
      },
    },
    status: "number",
    success: "boolean",
    message: "string",
  },
  companyBody: {
    name: "string",
  },
  companyParam: {
    id: "string",
  },
};
