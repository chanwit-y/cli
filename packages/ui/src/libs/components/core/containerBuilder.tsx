import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Container, FnAPI4, DataTableElement, FnAPI, APIFunction, Bin, ModalElement, TElement } from "../@types";
import { Form } from "../form";
import { Autocomplete } from "./autocomplete";
import { Schema } from "./schema";
import { Provider } from "./context";
import { DataTable } from "./dataTable";
import { Modal } from "./modal"
import { ElementBuilder } from "./elementBuilder";
import { Button } from "@radix-ui/themes";

// const registers = {
// 	autocomplete: Autocomplete,
// 	datatable: DataTable,
// 	modal: Modal,
// }
export class ContainerBuilder<M extends TModelMaster, A extends TApiMaster<M>> {

	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>) { }

	private _schema() {
		const schema = new Schema(this._connainers);
		return schema.generate();
	}

	public getSchema() {
		return this._schema();
	}

	private _renderElement(b: Bin, f: any | undefined, api: APIFunction | undefined) {
		const el = (new ElementBuilder(b.element as TElement))
			.withAPI(api)
			.withForm(f)
			.withTrigger(<Button>Open Modal</Button>)
			.withAPIs(this._apis as unknown as ApiMaster<TModelMaster, TApiMaster<TModelMaster>>)
			.build(b.type);

		if (el !== null) return el.create();

		// For use api
		// if (api) {
		// 	switch (b.type) {
		// 		case "autocomplete":
		// 			return new Autocomplete(b.element as AutocompleteElement, f, api).create();
		// 		case "datatable":
		// 			return new DataTable(b.element as DataTableElement, api).create();
		// 		// case "modal":
		// 		// 	return new Modal(, <></>).create();
		// 	}
		// } else {
		// 	switch(b.type) {
		// 		case "modal": 
		// 			return new Modal(b.element as ModalElement, <>Hi</>).create();	
		// 	}	
		// }
		// // Element with API
		// if (b.element && 'api' in b.element && api) {
		// 	if (b.type === 'autocomplete') {
		// 		return new registers.autocomplete(b.element as AutocompleteElement, f, api).create();
		// 	}
		// 	return new registers.datatable(b.element as DataTableElement, api).create();
		// }

		// Nested container
		if (b.container && b.container.bins) {
			return (new ContainerBuilder([b.container], this._apis)).draw();
		}

		// Fallback
		return <span>*</span>;
	}

	public draw() {
		const F = new Form(this.getSchema()).setup().create();

		return <F.Fn>
			{(f) => (
				<Provider>
					<div className="grid grid-cols-12 gap-1">
						{this._connainers.map((c) => {
							return c.bins.map((b) => {
								const api = b.element && 'api' in b.element ? this._apis.api[b.element.api.name] as APIFunction : undefined;
								const colClasses = `sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}`;

								console.log('type', b.type)
								console.log('api', api)

								return (
									<div className={colClasses}>
										{this._renderElement(b, f, api)}
									</div>
								);
							})
						})}
					</div>
				</Provider>
			)}
		</F.Fn>
	}
}
