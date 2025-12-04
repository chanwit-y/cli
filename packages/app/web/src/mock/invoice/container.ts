// import type { Bin, Container } from "../../../@types";

import type { Bin, Container } from "vegaui";

export const invoiceDetail: Bin[] = [
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
      name: "invoice_type_id",
      label: "Invoice Type ID",
      dataType: "string",
      isRequired: true,
      errorMessage: "Invoice Type ID is request",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "textfield",
    element: {
      name: "description",
      label: "Description",
      dataType: "string",
      isRequired: true,
      errorMessage: "Description is request",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "textfield",
    element: {
      name: "country",
      label: "Country",
      dataType: "string",
      isRequired: true,
      errorMessage: "Country is request",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "textfield",
    element: {
      name: "doc_category_code",
      label: "DOC Category Code",
      dataType: "string",
      isRequired: true,
      errorMessage: "DOC Category Code is request",
    },
  },
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "textfield",
    element: {
      name: "invoice_type_lookup_code",
      label: "Invoice Type Lookup Code",
      dataType: "string",
      isRequired: true,
      errorMessage: "Invoice Type Lookup Code is request",
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
        key: "dtInvoice",
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
        title: "Update Invoice",
        description: "Are you sure you want to update this invoice?",
        True: [
          "StratLoading",
          "SubmitFormToPatchAPI",
          "StopLoading",
          "CloseModal",
        ],
        False: [],
      },
      reloadDataTable: "dtInvoice",
      actions: ["ConfirmBox"],
      api: {
        name: "updateInvoices",
      },
      snackbarSuccess: {
        type: "success",
        message: "Invoice updated successfully",
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
        key: "dtInvoice",
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
        title: "Create Invoice",
        description: "Are you sure you want to create this invoice?",
        True: [
          "StratLoading",
          "SubmitFormToPostAPI",
          "StopLoading",
          "CloseModal",
        ],
        False: [],
      },
      reloadDataTable: "dtInvoice",
      actions: ["ConfirmBox"],
      api: {
        name: "createInvoices",
      },
      snackbarSuccess: {
        type: "success",
        message: "Invoice created successfully",
      },
      snackbarError: "$exception",
    },
  },
];

export const containerInvoiceDetail: Container = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "InvoiceList",
  contextData: "dtInvoice",
  isAaary: false,
  bins: invoiceDetail,
};

export const invoiceList: Bin[] = [
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
      container: containerInvoiceDetail,
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
      name: "dtInvoice",
      title: "Invoices",
      modalContainer: containerInvoiceDetail,
      modalMaxWidth: "800px",
      modalMinWidth: "700px",
      canEdit: true,
      canDelete: true,
      columns: [
        {
          accessor: "invoice_type_id",
          header: "Invoice Type ID",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        {
          accessor: "country",
          header: "Country",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        {
          accessor: "invoice_type_lookup_code",
          header: "Invoice Type Lookup Code",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        {
          accessor: "doc_category_code",
          header: "DOC Category Code",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        {
          accessor: "description",
          header: "Description",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
      ],
      apiDeleteInfo: {
        name: "deleteInvoices",
        params: {
          id: "_id",
        },
        confirmBox: {
          title: "Delete Invoice",
          description: "Are you sure you want to delete this invoice?",
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
        name: "invoices",
        paths: ["data"],
        body: {
          collectionId: {
            type: "value",
            key: "collectionId",
            value: "693150b370aaff236ea8148e",
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

export const containerInvoiceList: Container[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "InvoiceList",
    isAaary: false,
    bins: invoiceList,
  },
];
