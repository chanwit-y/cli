import type { Bin, Container } from "../../../@types";

export const sourceAppDetail: Bin[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "hidden",
    element: {
      name: "id",
      dataType: "string"
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "textfield",
    element: {
      name: "name",
      label: "Source application",
      dataType: "string",
      isRequired: true,
      errorMessage: "name is request",
    },
  },

  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "autocomplete",
    element: {
      name: "type",
      dataType: "string",
      label: "Type",
      canObserve: true,
      observeTo: "", // for call api
      isRequired: true,
      errorMessage: "type is request",
      keys: {
        id: "id",
        search: "name",
        display: "name",
      },
      options: [
        {
          id: "source",
          name: "Source",
        },
        {
          id: "destination",
          name: "Destination",
        },
      ],
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "autocomplete",
    element: {
      name: "webhookId",
      dataType: "string",
      label: "Web Hook",
      canObserve: false,
      observeTo: "", // for call api
      isRequired: true,
      errorMessage: "web hook is request",
      keys: {
        id: "id",
        search: "name",
        display: "name",
      },
      api: {
        name: "webHooks",
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
        },
      },
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "autocomplete",
    element: {
      name: "mappingId",
      dataType: "string",
      label: "Service",
      canObserve: false,
      observeTo: "", // for call api
      enabledWhen: {
        left: {
          type: "observe",
          name: "type",
        },
        operator: "eq",
        right: {
          type: "value",
          value: "source",
        },
      },
      isRequired: false,
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
    lg: "6",
    xl: "6",
    type: "button",
    element: {
      label: "Create",
      actions: ["SubmitFormToAPI", "ReloadDataTable"],
      api: {
        name: "sourceAppsPost",
      }
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "button",
    element: {
      label: "Update",
      actions: ["SubmitFormToAPI", "ReloadDataTable"],
      api: {
        name: "sourceAppsPatch",
      }
    },
  },
];


export const containerSourceAppDetail: Container = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "SourceAppDetail",
    isAaary: false,
    bins: sourceAppDetail,
  };

export const sourceAppList: Bin[] = [
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
      container: containerSourceAppDetail,
      maxWidth: "800px",
      trigger: {
        label: "",
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
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "datatable",
    element: {
      name: "sourceApps",
      title: "Source Apps",
      modalContainer: containerSourceAppDetail,
      columns: [
        {
          accessor: "name",
          header: "Name",
          enableColumnFilter: true,
          enableSorting: true,
        },
        {
          accessor: "createdBy",
          header: "Created By",
          enableColumnFilter: true,
          enableSorting: true,
        },
      ],
      api: { // Get API
        name: "sourceApps",
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
        },
      },
      
    },
  },

  // {
  //   sm: "12",
  //   md: "6",
  //   lg: "4",
  //   xl: "3",
  //   type: "multiAutocomplete",
  //   element: {
  //     name: "mapping2",
  //     dataType: "array",
  //     canObserve: false,
  //     observeTo: "",
  //     isRequired: true,
  //     errorMessage: "mapping is request",
  //     keys: {
  //       id: "id",
  //       search: "mappingName",
  //       display: "mappingName",
  //     },
  //     api: {
  //       name: "mappings",
  //       paths: ["data", "result"],
  //       query: {
  //         offset: {
  //           type: "value",
  //           key: "offset",
  //           value: 0,
  //         },
  //         limit: {
  //           type: "value",
  //           key: "limit",
  //           value: 100,
  //         },
  //         userId: {
  //           type: "value",
  //           key: "userId",
  //           value: "0",
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   sm: "1",
  //   md: "1",
  //   lg: "1",
  //   xl: "1",
  //   type: "checkbox",
  //   element: {
  //     name: "checkbox",
  //   label: "Active",
  //     dataType: "boolean",
  //     isRequired: false,
  //     errorMessage: "",
  //   },
  // },
];


export const containerSourceAppList: Container[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "SourceApp",
    isAaary: false,
    bins: sourceAppList,
  },
];

