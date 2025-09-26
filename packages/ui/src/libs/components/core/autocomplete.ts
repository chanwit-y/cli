import type { IElement } from "./types";
import { createElement, type JSX } from "react";
import { debounce, distinct, interval, Subject, switchMap } from "rxjs";
import { AutocompleteF2 } from "../form";
import type { APIFunction, AutocompleteElement } from "../@types";

export class Autocomplete implements IElement {



	constructor(
		private _props: AutocompleteElement,
		private _form: any,
		private _fnAPI: APIFunction) {

	}

	// private _api(params: Record<string, any>) {
	// 	const subject = new Subject<string>();
	// 	return subject.pipe(
	// 		debounce(() => interval(500)),
	// 		distinct(),
	// 		switchMap(async (text) => {
	// 			return Promise.resolve(this._fnAPI({ text }, params))
	// 		}),

	// 	)
	// }

	public create(): JSX.Element {
		return createElement(AutocompleteF2, {
			name: this._props.name,
			form: this._form,
			searchKey: this._props.keys.search,
			idKey: this._props.keys.id,
			displayKey: this._props.keys.display,
			errorMessage: this._props.errorMessage,
			api: this._fnAPI,
			canObserve: this._props.canObserve,
			observeTo: this._props.observeTo,
			apiObserveParam: this._props.api.observeParam,
			options: [], // Add required options property
		})
	}
}