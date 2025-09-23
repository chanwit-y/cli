import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Container } from "../@types";
import { Form } from "../form";
import { Autocomplete } from "./autocomplete";
import { Schema } from "./schema";

export class Builder<M extends TModelMaster, A extends TApiMaster<M>> {
	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>) { }

	//TODO add method create form schema
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
				<>
					<div className="grid grid-cols-12 gap-1">
						{this._connainers.map((c) => {
							return c.boxs.map((b) => {
								return <div className={`sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}  `}>
									{b.element && 'api' in b.element
										? new Autocomplete(b.element as AutocompleteElement, f, this._apis.api[b.element.api.name] as (query: Record<string, any>, params: Record<string, any>) => Promise<any>).create()
										: b.container && b.container.boxs
											? (new Builder([b.container], this._apis)).draw()
											: <span>x</span>
									}
								</div>
							})
						})}
					</div>

					{/* <pre>
						{JSON.stringify(this.getSchema(), null, 2)}
					</pre> */}
				</>
			)}
		</F.Fn>
	}
}
