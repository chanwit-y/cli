import { createElement, type JSX } from "react";
import { AutocompleteF2 } from "../form";
import type { APIFunction, AutocompleteElement, IElement } from "../@types";

export class Autocomplete implements IElement {

	constructor(
		private _props: AutocompleteElement,
		private _form: any,
		private _api: APIFunction) {

	}

	public create(): JSX.Element {
		return createElement(AutocompleteF2, {
			name: this._props.name,
			form: this._form,
			searchKey: this._props.keys.search,
			idKey: this._props.keys.id,
			displayKey: this._props.keys.display,
			errorMessage: this._props.errorMessage,
			api: this._api,
			canObserve: this._props.canObserve,
			observeTo: this._props.observeTo,
			apiInfo: this._props.api,
			// apiObserveParam: this._props.api.observeParam,
			options: [], // Add required options property
		})
	}
}