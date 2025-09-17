import { ModelFactory, type TModelMaster } from "../../../model/master";

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
  todoRes: {
    data: {
      type: "array",
      collection: {
        id: "number",
        name: "string",
        email: "string",
        age: "number",
        role: "string",
      },
    },
    pagination: base.pagination,
  },
  todoPram: {
    id: "number",
  },
};
