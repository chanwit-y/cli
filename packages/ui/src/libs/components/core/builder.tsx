import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Box } from "../@types";
import { Autocomplete } from "./autocomplete";
// import { Element } from "./element";

export class Builder<M extends TModelMaster, A extends TApiMaster<M>> {
	constructor(private _boxs: Box[], private _apis: ApiMaster<M, A>, private _form: any) { }

	//TODO add method create form schema
	private _schema() {

	}

	public draw() {
		return <div className="grid grid-cols-12 gap-1">
			{this._boxs.map((b) => {
				return (
					<div className={`sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}  `}>
						{b.element && 'api' in b.element
							? new Autocomplete(b.element as AutocompleteElement, this._form, this._apis.api[b.element.api.name] as (query: Record<string, any>, params: Record<string, any>) => Promise<any>).create()
							: b.container && b.container.boxs
								? (new Builder(b.container.boxs, this._apis, this._form)).draw() 
								: <span>x</span>}
					</div>)
			})}
		</div>
	}
}
