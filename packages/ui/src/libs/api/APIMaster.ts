import {
  Literal,
  type Static,
  type TLiteral,
  type TObject,
  type TSchema,
} from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { ApiFactory, Method, t } from "./APIFactory";
import { HttpClientFactory } from "./HttpClientFactory";
import { convertTModelToTypeBox, type TModel } from "../model";

export const http = new HttpClientFactory(
  `https://jsonplaceholder.typicode.com/`,
  async () => "",
  "1.0.0",
  120000,
  [],
  []
);

const methods = (method: "GET" | "POST" | "PUT" | "DELETE") =>
  Literal(Method[method]);

const apiFactory = new ApiFactory(http, {});


const collection: TModel = {
  name: "string",
  age: "number",
  address: {
    type: "object",
    collection: {
      address1: "string",
      building: {
        type: "array",
        collection: {
          name: "string",
          age: "number",
        },
      },
    },
  },
};

const schema = convertTModelToTypeBox(collection);

const validData = {
  name: "John Doe",
  age: 30,
  address: {
    address1: "123 Main St",
    building: [
      { name: "Building A", age: 10 },
      { name: "Building B", age: 15 },
    ],
  },
};

const isValid = Value.Check(schema, validData);
console.log("isValid: ", isValid);

// const api = apiFactory.createService({
//   post: {
//     url: "/posts",
//     method: methods("GET"),
//     response: X,
//     query: t.Object({}),
//     parameter: t.Object({}),
//     body: t.Object({}),
//     withOptions: t.Literal(false),
//   },
// });

// class ApiConfig {
//   private _url: string;
//   private _method: TLiteral;
//   private _response: TObject;
//   private _query: TObject;
//   private _parameter: TObject;
//   private _body: TObject;
//   private _withOptions: TLiteral;

//   constructor() {}
// }

// const a = Literal('GET')
// const b = {
// 	const: 'GET',
// 	type: 'string'
// }

// const c = a === b;
