import type { APIFunction, BinType, IElement, TElement } from "../@types";
import type { TModelMaster } from "../../model/master";
import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import { ElementData } from "./const/elementData";

// export const E = (element: TElement) => {
// 	return {
// 		"autocomplete": (form: any, api: APIFunction) => api ? new Autocomplete(element as AutocompleteElement, form, api) : null,
// 		"datatable": (form: any, api: APIFunction) => api ? new DataTable(element as DataTableElement, api) : null,
// 		"modal": () => element ? new Modal(element as ModalElement, <></>) : null,
// 	}
// }

export class ElementContext<M extends TModelMaster, A extends TApiMaster<M>> {
	private _apis: ApiMaster<M, A> | undefined;
	private _form: any;

	constructor(private _element: TElement) { }

	/**
	 * Helper method to set a property only if the value is truthy
	 */
	private setIfPresent<T>(setter: () => void, value: T | undefined): this {
		if (!value) return this;
		setter();
		return this;
	}

	public withAPIs(apis: ApiMaster<M, A> | undefined): ElementContext<M, A> {
		return this.setIfPresent(() => { this._apis = apis; }, apis);
	}

	public withForm(form: any | undefined): ElementContext<M, A> {
		return this.setIfPresent(() => { this._form = form; }, form);
	}
	public get api() {
		const api = this._element && 'api' in this._element && this._element.api ? this._apis?.api?.[this._element.api.name] as APIFunction : undefined;
		if (!api) return undefined;
		return api
	}

	public get apis() {
		return this._apis
	}

	public get props(): TElement {
		return this._element;
	}

	public get form(): any {
		return this._form;
	}

	public build(type: BinType): IElement | null {
		try {
			console.log("type",type)
			return !["empty", "container"].includes(type) ? new (ElementData as any)[type](this) : null;
			
		} catch (err) {
			throw new Error(err instanceof Error ? err.message : String(err));
		}
	}
}
