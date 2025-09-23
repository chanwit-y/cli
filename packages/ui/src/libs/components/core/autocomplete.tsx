import type { IElement } from "./types";
import { createElement, type JSX } from "react";
import { debounce, distinct, interval, Subject, switchMap } from "rxjs";
import { AutocompleteF2 } from "../form";
import type { AutocompleteElement } from "../@types";

export class Autocomplete implements IElement {
	private _subject = new Subject<string>();


	constructor(
		private _props: AutocompleteElement,
		private _form: any,
		private _fnAPI: (query: Record<string, any>, params: Record<string, any>) => Promise<any>) {

	}

	private _api(params: Record<string, any>) {


		return this._subject.pipe(
			debounce(() => interval(500)),
			distinct(),
			switchMap(async (text) => {
				return Promise.resolve(this._fnAPI({ text }, params))
			}),

		)
	}
	public create(): JSX.Element {
		return createElement(AutocompleteF2, {
			name: this._props.name,
			form: this._form,
			searchKey: this._props.keys.search,
			idKey: this._props.keys.id,
			displayKey: this._props.keys.display,

			apiSubject: this._subject,
			api: this._api.bind(this),
			options: [], // Add required options property
		})
	}
}