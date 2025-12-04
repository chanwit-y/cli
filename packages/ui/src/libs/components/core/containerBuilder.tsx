import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { Container, APIFunction, Bin, TElement, ThemeContextType } from "../@types";
import { Form } from "../form";
import { Schema } from "./schema";
import { Provider } from "./context";
import { ElementContext } from "./elementBuilder";
import { useStord } from "./stord";
import { useEffect, useMemo } from "react";
import { ConditionExpression } from "./expression";
import { useTheme } from "../context";
export class ContainerBuilder<M extends TModelMaster, A extends TApiMaster<M>> {

	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>) { }

	private _schema() {
		const schema = new Schema(this._connainers);
		return schema.generate();
	}

	public getSchema() {
		return this._schema();
	}

	private _renderElement(b: Bin, f: any | undefined, api: APIFunction | undefined, t: ThemeContextType | undefined) {
		//TODO: sholde be 1 object
		let el = (new ElementContext(b.element as TElement))
			.Form(f)
			.APIs(this._apis as unknown as ApiMaster<TModelMaster, TApiMaster<TModelMaster>>);

		if (t) {
			el = el.Theme(t);
		}

		const builtElement = el.build(b.type);

		if (builtElement !== null) return builtElement.create();

		// Nested container
		if (b.container && b.container.bins) {
			return (new ContainerBuilder([b.container], this._apis)).draw();
		}

		// Fallback
		return <span></span>;
	}

	public draw(isRoot: boolean = false, withAuth: boolean = false, t: ThemeContextType | undefined = undefined) {
		const ctx = useStord((state) => state.contextData)
		// const defaultValues = selectedRow[this._connainers[0].name]
		// const defaultValues = useMemo(() => selectedRow[this._connainers[0].name] ?? {}, [selectedRow, this._connainers]) 

		//TODO: Fix code
		const defaultValues = useMemo(() => this._connainers.length > 0 ? ctx[this._connainers[0]?.contextData ?? ""] ?? {} : {}, [ctx, this._connainers])

		const F = new Form(this.getSchema(), defaultValues).setup().create();

		const theme = useTheme()

		return <F.Fn>
			{(f) => (
				<Provider isRoot={isRoot} withAuth={withAuth}>
					<div className="grid grid-cols-12 gap-2 items-center">
						{this._connainers.map((c) => {
							return c.bins.map((b) => {

								if (b.condition)
									if (!(new ConditionExpression(ctx).expression(b.condition))) return null;

								const api = b.element && 'api' in b.element && b.element.api && 'name' in b.element.api ? this._apis.api[b.element.api.name] as APIFunction : undefined;
								const colClasses = `sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl} `;

								return (
									<div className={`${colClasses} ${b.align ? `text-${b.align}` : ''}`}>
										{this._renderElement(b, f, api, theme)}
									</div>
								);
							})
						})}
					</div>
					{/* <pre>{JSON.stringify(ctx, null, 2)}</pre> */}
				</Provider>
			)}
		</F.Fn>
	}
}
