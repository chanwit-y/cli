import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { Container, APIFunction, Bin, TElement } from "../@types";
import { Form } from "../form";
import { Schema } from "./schema";
import { Provider } from "./context";
import { ElementContext } from "./elementBuilder";
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
		const el = (new ElementContext(b.element as TElement))
			.withForm(f)
			.withAPIs(this._apis as unknown as ApiMaster<TModelMaster, TApiMaster<TModelMaster>>)
			.build(b.type);

		if (el !== null) return el.create();

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
					<div className="grid grid-cols-12 gap-1 items-center">
						{this._connainers.map((c) => {
							return c.bins.map((b) => {
								const api = b.element && 'api' in b.element && b.element.api && 'name' in b.element.api ? this._apis.api[b.element.api.name] as APIFunction : undefined;
								const colClasses = `sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl} `;

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
