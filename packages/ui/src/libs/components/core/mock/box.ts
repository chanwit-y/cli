import type { Box, Container } from "../../@types";
import { Table } from "./table";

export const variables = {};

export const initLoad = {};

export const boxs: Box[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "datatable",
    element: Table
  },
  {
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
    type: "autocomplete",
    element: {
      name: "siteId",
      dataType: "string",
      canObserve: true,
      observeTo: "",
      isRequired: true,
      errorMessage: "site is request",
      keys: {
        id: "value",
        search: "label",
        display: "label",
      },
      api: {
        name: "sites",
      },
    },
  },
  {
    type: "autocomplete",
    sm: "12",
    md: "6",
    lg: "4",
    xl: "3",
    element: {
      name: "seam",
      dataType: "string",
      canObserve: false,
      observeTo: "siteId",
      isRequired: true,
      errorMessage: "seam is request",
      keys: {
        id: "value",
        search: "label",
        display: "label",
      },
      api: {
        name: "seam",
        params: {
          siteId: {
            type: "observe",
            key: "siteId",
          },
        },
        query: {
          text: {
            type: "value",
            key: "none"
          }
        }
        // observeParam: "siteId",
      },
    },
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

// - add gap to container
// - change element to []