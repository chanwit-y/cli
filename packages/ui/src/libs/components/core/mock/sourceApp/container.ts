import type { Bin, Container } from "../../../@types";

export const bins: Bin[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "datatable",
    element: {
      name: "sourceApps",
      title: "Source Apps",
      columns: [
        {
          accessor: "name",
          header: "Name",
        },
        {
          accessor: "createdBy",
          header: "Created By",
        }
      ],
      api: {
        name: "sourceApps",
      },
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
    type: "autocomplete",
    element: {
      name: "mapping",
      dataType: "string",
      canObserve: false,
      observeTo: "",
      isRequired: true,
      errorMessage: "mapping is request",
      keys: {
        id: "id",
        search: "mappingName",
        display: "mappingName",
      },
      api: {
        name: "mappings",
        paths: ["data", "result"],
        query: {
          offset: {
            type: "value",
            key: "offset",
            value: 0,
          },
          limit: {
            type: "value",
            key: "limit",
            value: 100,
          },
          userId: {
            type: "value",
            key: "userId",
            value: "0",
          },
        },
      },
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
    type: "multiAutocomplete",
    element: {
      name: "mapping2",
      dataType: "array",
      canObserve: false,
      observeTo: "",
      isRequired: true,
      errorMessage: "mapping is request",
      keys: {
        id: "id",
        search: "mappingName",
        display: "mappingName",
      },
      api: {
        name: "mappings",
        paths: ["data", "result"],
        query: {
          offset: {
            type: "value",
            key: "offset",
            value: 0,
          },
          limit: {
            type: "value",
            key: "limit",
            value: 100,
          },
          userId: {
            type: "value",
            key: "userId",
            value: "0",
          },
        },
      },
    },
  },
];
export const containers: Container[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "container",
    isAaary: false,
    bins,
  },
];
