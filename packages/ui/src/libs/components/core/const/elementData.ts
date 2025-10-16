// import type { TApiMaster } from "../../../api/APIMaster";
// import type { TModelMaster } from "../../../model/master";
// import type { IElement } from "../../@types";
import { Autocomplete } from "../autocomplete";
import { Button } from "../button";
import { DataTable } from "../dataTable";
import { Modal } from "../modal";
// import type { IElement } from "../@types";
// import type { TModelMaster } from "../../model/master";
// import type { TApiMaster } from "../../api/APIMaster";

// Type for element data mapping: string keys to class constructors
// export type ElementDataMap = {
// 	[key: string]: new <M extends TModelMaster, A extends TApiMaster<M>>(
// 		context: any
// 	) => IElement;
// } ;

export const ElementData = {
	button: Button,
	modal: Modal,
	autocomplete: Autocomplete,
	datatable: DataTable,
}