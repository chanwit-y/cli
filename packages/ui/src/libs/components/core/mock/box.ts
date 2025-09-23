import type { Box, Container } from "../../@types";

export const variables = {};

export const initLoad = {};

export const boxs: Box[] = [
  {
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
    type: "autocomplete",
    element: {
      type: "autocomplete",
      name: "test",
      dataType: "string",
      canObserve: true,
      isRequired: true,
      errorMessage: "test is request",
      keys: {
        id: "id",
        search: "title",
        display: "title",
      },
      api: {
        name: "todos",
        params: {},
      },
    },
  },
  {
    type: "empty",
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
  },
  {
    type: "empty",
    sm: "6",
    md: "6",
    lg: "6",
    xl: "6",
  },
  {
    type: "container",
    sm: "6",
    md: "6",
    lg: "6",
    xl: "6",
    container: {
      name: "container",
      isAaary: false,
      boxs: [
        {
          type: "empty",
          sm: "4",
          md: "4",
          lg: "4",
          xl: "4",
        },
        {
          type: "empty",
          sm: "4",
          md: "4",
          lg: "4",
          xl: "4",
        },
        {
          type: "empty",
          sm: "4",
          md: "4",
          lg: "4",
          xl: "4",
        },
        {
          type: "empty",
          sm: "4",
          md: "4",
          lg: "4",
          xl: "4",
        },
      ],
    },
  },
  {
    type: "empty",
    sm: "6",
    md: "6",
    lg: "6",
    xl: "6",
  },
];

export const containers: Container[] = [
  {
    name: "container",
    isAaary: false,
    boxs: boxs,
  },
];
