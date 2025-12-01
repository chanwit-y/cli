import type { Bin, Container } from "vegaui";
import { Table } from "./table";

export const variables = {};

export const initLoad = {};

export const contentModal1: Container = {
  id: "a7f3c891-4b2e-4d9a-8f6c-3e5d7a9b1c4f",
  name: "container",
  isAaary: false,
  bins: [
    {
      sm: "12",
      md: "12",
      lg: "12",
      xl: "12",
      type: "datatable",
      element: Table,
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
};

export const boxs: Bin[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "datatable",
    element: Table,
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
            key: "none",
          },
        },
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
      id: "a7f3c891-4b2e-4d9a-8f6c-3e5d7a9b1c4f",
      name: "container",
      isAaary: false,
      bins: [
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
          type: "modal",
          sm: "4",
          md: "4",
          lg: "4",
          xl: "4",
          element: {
            id: "a7f3c891-4b2e-4d9a-8f6c-3e5d7a9b1c4f",
            title: "modal",
            description: "modal",
            container: contentModal1,
            maxWidth: "800px",
            trigger: {
              label: "trigger",
              actions: ["OpenModal"],
              icon: "puls",
            },
            // trigger: {
            //   label: "",
            //   action: "OpenModal",
            //   icon: "puls"
            // }
          },
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
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "container",
    isAaary: false,
    bins: boxs,
  },
];

// - add gap to container
// - change element to []
