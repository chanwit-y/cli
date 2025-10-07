import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Container, FnAPI, DataTableElement } from "../@types";
import { Form } from "../form";
import { Autocomplete } from "./autocomplete";
import { Schema } from "./schema";
import { Provider } from "./context";
import { DataTable } from "./dataTable";

const registers = {
	autocomplete: Autocomplete,
	datatable: DataTable,
}
export class Builder<M extends TModelMaster, A extends TApiMaster<M>> {

	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>) { }

	private _schema() {
		const schema = new Schema(this._connainers);
		return schema.generate();
	}

	public getSchema() {
		return this._schema();
	}

	private _renderElement(b: any, f: any, api: FnAPI | null) {
		// Element with API
		if (b.element && 'api' in b.element && api) {
			if (b.type === 'autocomplete') {
				return new registers.autocomplete(b.element as AutocompleteElement, f, api).create();
			}
			return new registers.datatable(b.element as DataTableElement, api).create();
		}

		// Nested container
		if (b.container && b.container.boxs) {
			return (new Builder([b.container], this._apis)).draw();
		}

		// Fallback
		return <span>x</span>;
	}

	public draw() {
		const F = new Form(this.getSchema()).setup().create();

		return <F.Fn>
			{(f) => (
				<Provider>
					<div className="grid grid-cols-12 gap-1">
						{this._connainers.map((c) => {
							return c.boxs.map((b) => {
								const api = b.element && 'api' in b.element ? this._apis.api[b.element.api.name] as FnAPI : null;
								const colClasses = `sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}`;

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
