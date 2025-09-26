import type { Subject } from "rxjs";
import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Container, FnAPI } from "../@types";
import { Form } from "../form";
import { Autocomplete } from "./autocomplete";
import { Schema } from "./schema";
import { Provider } from "./context";

const registers = {
	autocomplete: Autocomplete,
}
export class Builder<M extends TModelMaster, A extends TApiMaster<M>> {

	// private _gobalValue: Record<string, any> = {};
	// private _observeTable: Record<string, Subject<unknown>> = {};


	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>) { }

	private _schema() {
		const schema = new Schema(this._connainers);
		return schema.generate();
	}

	public getSchema() {
		return this._schema();
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

								return <div className={`sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}  `}>
									{b.element && 'api' in b.element && api
										? new registers[b.type as keyof typeof registers](b.element as AutocompleteElement, f, api).create()
										: b.container && b.container.boxs
											? (new Builder([b.container], this._apis)).draw()
											: <span>x</span>
									}
								</div>
							})
						})}
					</div>
				</Provider>
			)}
		</F.Fn>
	}
}
