import type { ElementContext } from "./elementBuilder";
import type { IElement, TextFieldProps } from "../@types";

import { createElement, type JSX } from "react";
import {TextField as TextFieldComponent} from "../TextField" 
import type { TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";


export class TextField<M extends TModelMaster, A extends TApiMaster<M>> implements IElement {

	constructor(private _context: ElementContext<M, A>) {}

	create(): JSX.Element {
		const props = this._context.props;
		return createElement<TextFieldProps>(TextFieldComponent, props)
	}

}