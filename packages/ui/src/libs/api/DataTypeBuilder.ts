import { Type } from "@sinclair/typebox";
import type { TObject, TString, TNumber, TArray } from "@sinclair/typebox";

export type DataTypeMapping = Record<
  string,
  "string" | "number" | Record<string, string> | Array<Record<string, string>>
>;

export type SchemaFromMapping<T extends DataTypeMapping> = TObject<{
  [K in keyof T]: T[K] extends "string"
    ? TString
    : T[K] extends "number"
      ? TNumber
      : T[K] extends Record<string, string | number>
        ? TObject<Record<string, TString | TNumber>>
        : T[K] extends Array<Record<string, string>>
          ? TArray<TObject<Record<string, TString | TNumber>>>
          : never;
}>;

type T1 = SchemaFromMapping<{
  name: "string";
  age: "number";
  address: {
    street: "string";
  };
  tags: Array<{
    name: "string";
    description: "string";
  }>;
}>;

// // Function to create schema from mapping
// export function createSchemaFromMapping<T extends DataTypeMapping>(mapping: T) {
//   const properties: Record<string, TString | TNumber | TObject<Record<string, TString | TNumber>>> = {};

//   for (const [key, type] of Object.entries(mapping)) {
//     if (type === "string") {
//       properties[key] = Type.String();
//     } else if (type === "number") {
//       properties[key] = Type.Number();
//     } else if (typeof type === "object" && type !== null) {
//       // Handle nested objects
//       const nestedProperties: Record<string, TString | TNumber> = {};
//       for (const [nestedKey, nestedType] of Object.entries(type)) {
//         if (nestedType === "string") {
//           nestedProperties[nestedKey] = Type.String();
//         } else if (nestedType === "number") {
//           nestedProperties[nestedKey] = Type.Number();
//         }
//       }
//       properties[key] = Type.Object(nestedProperties);
//     }
//   }

//   return Type.Object(properties);
// }
