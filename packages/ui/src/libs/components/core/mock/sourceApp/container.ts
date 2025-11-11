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
      isSingleLoad: true,
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
      isSingleLoad: true,
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
      actions: ["StratLoading", "SubmitFormToPostAPI", "ReloadDataTable", "StopLoading"],
      api: {
        name: "sourceAppsPost",
      },
      snackbarSuccess: {
        type: "success",
        message: "Source application created successfully",
      },
      snackbarError: "$exception",
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
      actions: ["StratLoading", "SubmitFormToPatchAPI", "ReloadDataTable", "StopLoading"],
      api: {
        name: "sourceAppsPatch",
      },
      snackbarSuccess: {
        type: "success",
        message: "Source application updated successfully",
      },
      snackbarError: "$exception",
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
    type: "empty",
    sm: "11",
    md: "11",
    lg: "11",
    xl: "11",
  },
  {
    type: "modal",
    sm: "1",
    md: "1",
    lg: "1",
    xl: "1",
    align: "end",
    element: {
      id: "a7f3c891-4b2e-4d9a-8f6c-3e5d7a9b1c4f",
      title: "modal",
      description: "modal",
      container: containerSourceAppDetail,
      maxWidth: "800px",
      trigger: {
        label: "",
        actions: [ "ClearCurrentFormSeleted"],
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
      canEdit: true,
      canDelete: true,
      columns: [
        {
          accessor: "name",
          header: "Name",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        {
          accessor: "mappingName",
          header: "Mapping Name",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start"
        },
        {
          accessor: "createdBy",
          header: "Created By",
          enableColumnFilter: true,
          enableSorting: true,
          align: "center"
        },
        //mappingName
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

