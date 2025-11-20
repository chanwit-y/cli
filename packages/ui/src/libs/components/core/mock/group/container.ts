import type { Bin, Container } from "../../../@types";

export const groupDetail: Bin[] = [
  {
    sm: "12",
    md: "12",
    lg: "12",
    xl: "12",
    type: "hidden",
    element: {
      name: "id",
      dataType: "string",
    },
  },
  {
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6",
    type: "textfield",
    element: {
      name: "code",
      label: "Code",
      dataType: "number",
//       isRequired: true,
//       errorMessage: "code is request",
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
      label: "Name",
      dataType: "string",
      isRequired: true,
      errorMessage: "name is request",
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
	    key: "Group",
	    path: "id"
	  },
	  operator: "eq",
	  left: {
	    val: undefined
	  }
	},
	element: {
	  label: "Create",
	  confirmBox: {
	    title: "Create Group",
	    description: "Are you sure you want to create this group?",
	    True: [
	      "StratLoading",
	      "SubmitFormToPostAPI",
	      "ReloadDataTable",
	      "StopLoading",
	      "CloseModal"
	    ],
	    False: [],
	  },
	  actions: ["ConfirmBox"],
	  api: {
	    name: "groupPost",
	  },
	  snackbarSuccess: {
	    type: "success",
	    message: "Group created successfully",
	  },
	  snackbarError: "$exception",
	},
      },
];

export const containerGroupDetail: Container = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "GroupList",
  isAaary: false,
  bins: groupDetail,
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
      container: containerGroupDetail,
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
      name: "groups",
      title: "Groups",
      modalContainer: containerGroupDetail,
      modalMaxWidth: "800px",
      modalMinWidth: "700px",
      canEdit: true,
      canDelete: true,
      columns: [
        {
          accessor: "code",
          header: "Code",
          enableColumnFilter: true,
          enableSorting: true,
          align: "end",
        },
        {
          accessor: "name",
          header: "Name",
          enableColumnFilter: true,
          enableSorting: true,
          align: "start",
        },
        //mappingName
      ],
      //     apiDeleteInfo: {
      //       name: "sourceAppsDelete",
      //       params: {
      // 	id: "id",
      //       },
      //       confirmBox: {
      // 	title: "Delete Source Application",
      // 	description:
      // 	  "Are you sure you want to delete this source application?",
      // 	True: [
      // 	  "StratLoading",
      // 	  "SubmitFormToDeleteAPI",
      // 	  "ReloadDataTable",
      // 	  "StopLoading",
      // 	],
      // 	False: [],
      //       },
      //       snackbarSuccess: {
      // 	type: "success",
      // 	message: "Source application deleted successfully",
      //       },
      //       snackbarError: "$exception",
      //     },
      api: {
        // Get API
        name: "groups",
        paths: ["data"],
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
];

export const containerGroupList: Container[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "GroupList",
    isAaary: false,
    bins: groupList,
  },
];
