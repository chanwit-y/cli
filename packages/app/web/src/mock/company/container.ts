// import type { Bin, Container } from "../../../@types";

import type { Bin, Container } from "vegaui";

export const companyDetail: Bin[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "hidden",
    element: {
      name: "_id",
      dataType: "string",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "textfield",
    element: {
      name: "name",
      label: "Name",
      dataType: "string",
      isRequired: true,
      errorMessage: "name is request",
    },
  },
  // {
  //   sm: "12",
  //   md: "6",
  //   lg: "6",
  //   xl: "6",
  //   type: "checkbox",
  //   element: {
  //     name: "isActive",
  //     label: "Is Active",
  //     dataType: "boolean",
  //   },
  // },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "button",
    align: "end",
    condition: {
      right: {
        key: "dtCompany",
        path: "_id",
      },
      operator: "neq",
      left: {
        val: undefined,
      },
    },
    element: {
      label: "Update",
      confirmBox: {
        title: "Update Company",
        description: "Are you sure you want to create this company?",
        True: [
          "StratLoading",
          "SubmitFormToPatchAPI",
          "StopLoading",
          "CloseModal",
        ],
        False: [],
      },
      reloadDataTable: "dtCompany",
      actions: ["ConfirmBox"],
      api: {
        name: "updateCompany",
      },
      snackbarSuccess: {
        type: "success",
        message: "Company created successfully",
      },
      snackbarError: "$exception",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "button",
    align: "end",
    condition: {
      right: {
        key: "dtCompany",
        path: "_id",
      },
      operator: "eq",
      left: {
        val: undefined,
      },
    },
    element: {
      label: "Create",
      confirmBox: {
        title: "Create Company",
        description: "Are you sure you want to create this company?",
        True: [
          "StratLoading",
          "SubmitFormToPostAPI",
          "StopLoading",
          "CloseModal",
        ],
        False: [],
      },
      reloadDataTable: "dtCompany",
      actions: ["ConfirmBox"],
      api: {
        name: "createCompany",
      },
      snackbarSuccess: {
        type: "success",
        message: "Company created successfully",
      },
      snackbarError: "$exception",
    },
  },
];

export const containerCompanyDetail: Container = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "GroupList",
  contextData: "dtCompany",
  isAaary: false,
  bins: companyDetail,
};

export const groupList: Bin[] = [
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
      id: "modal",
      title: "modal",
      description: "modal",
      container: containerCompanyDetail,
      maxWidth: "800px",
      minWidth: "700px",
      trigger: {
        label: "",
        actions: ["ClearCurrentFormSeleted"],
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
      name: "dtCompany",
      title: "Companies",
      modalContainer: containerCompanyDetail,
      modalMaxWidth: "800px",
      modalMinWidth: "700px",
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
        //mappingName
      ],
      apiDeleteInfo: {
        name: "deleteCompany",
        params: {
          id: "_id",
        },
        confirmBox: {
          title: "Delete Company",
          description: "Are you sure you want to delete this company?",
          True: ["StratLoading", "SubmitFormToDeleteAPI", "StopLoading"],
          False: [],
        },

        isReload: true,
        snackbarSuccess: {
          type: "success",
          message: "Company deleted successfully",
        },
        snackbarError: "$exception",
      },
      api: {
        // Get API
        name: "companies",
        paths: ["data"],
        body: {
          collectionId: {
            type: "value",
            key: "collectionId",
            value: "691e9950992636eb1560eab8",
          },
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
];

export const containerCompanyList: Container[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "GroupList",
    isAaary: false,
    bins: groupList,
  },
];
