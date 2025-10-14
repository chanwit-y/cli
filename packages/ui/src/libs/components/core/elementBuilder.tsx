import type { ReactNode } from "react";
import type { APIFunction, AutocompleteElement, BinType, DataTableElement, IElement, ModalElement, TElement } from "../@types";
import { Autocomplete } from "./autocomplete";
import { DataTable } from "./dataTable";
import { Modal } from "./modal";
import { ContainerBuilder } from "./containerBuilder";
import type { TModelMaster } from "../../model/master";
import type { ApiMaster, TApiMaster } from "../../api/APIMaster";

// export const E = (element: TElement) => {
// 	return {
// 		"autocomplete": (form: any, api: APIFunction) => api ? new Autocomplete(element as AutocompleteElement, form, api) : null,
// 		"datatable": (form: any, api: APIFunction) => api ? new DataTable(element as DataTableElement, api) : null,
// 		"modal": () => element ? new Modal(element as ModalElement, <></>) : null,
// 	}
// }

export class ElementBuilder<M extends TModelMaster, A extends TApiMaster<M>> {
	private _apis: ApiMaster<M, A> | undefined;
	private _api: APIFunction | undefined;
	private _form: any;
	private _trigger: ReactNode;

	constructor(private _element: TElement) { }

	/**
	 * Helper method to set a property only if the value is truthy
	 */
	private setIfPresent<T>(setter: () => void, value: T | undefined): this {
		if (!value) return this;
		setter();
		return this;
	}

	public withAPIs(apis: ApiMaster<M, A> | undefined): ElementBuilder<M, A> {
		return this.setIfPresent(() => { this._apis = apis; }, apis);
	}

	// TODO: move logic get api
	public withAPI(api: APIFunction | undefined): ElementBuilder<M, A> {
		return this.setIfPresent(() => { this._api = api; }, api);
	}

	public withForm(form: any | undefined): ElementBuilder<M, A> {
		return this.setIfPresent(() => { this._form = form; }, form);
	}

	public withTrigger(trigger: ReactNode | undefined): ElementBuilder <M, A>{
		return this.setIfPresent(() => { this._trigger = trigger; }, trigger);
	}

	public build(type: BinType): IElement | null {
		switch (type) {
			case "autocomplete":
				if (!this._api) throw new Error("API is required for autocomplete");
				return new Autocomplete(this._element as AutocompleteElement, this._form, this._api);
			case "datatable":
				if (!this._api) throw new Error("API is required for datatable");
				return new DataTable(this._element as DataTableElement, this._api);
			case "modal":
				const el = this._element as ModalElement;
				if (!this._apis) throw new Error("API is required for datatable");
				const container = new ContainerBuilder([el.container], this._apis);

				return new Modal(this._element as ModalElement, this._trigger, container.draw());
			default:
				return null;
		}
		throw new Error("Invalid element type");
	}
}