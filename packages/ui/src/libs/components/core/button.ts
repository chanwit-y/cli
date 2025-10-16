import { createElement, type JSX } from "react";
import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonElement, IElement } from "../@types";
import type { TApiMaster } from "../../api/APIMaster";
import type { ElementContext } from "./elementBuilder";
import type { TModelMaster } from "../../model/master";
import { IconData } from "./const/iconData";

export class Button<M extends TModelMaster, A extends TApiMaster<M>> implements IElement {

	constructor(private _context: ElementContext<M, A>) {}

	create(): JSX.Element {
		const props = this._context.props as ButtonElement;
		const icon = IconData[props.icon];
		return createElement(RadixButton, {}, createElement(icon, {}), props.label)
	}
}