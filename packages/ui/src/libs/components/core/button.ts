import { createElement, type JSX } from "react";
import { Button as ElementButton } from '../Button'
import type { ButtonElement, IElement } from "../@types";
import type { TApiMaster } from "../../api/APIMaster";
import type { ElementContext } from "./elementBuilder";
import type { TModelMaster } from "../../model/master";
import { IconData } from "./const/iconData";

export class Button<M extends TModelMaster, A extends TApiMaster<M>> implements IElement {

	constructor(private _context: ElementContext<M, A>) {}

	create(): JSX.Element {
		const props = this._context.props as unknown as ButtonElement;
		const icon = props.icon ? IconData[props.icon] : null;

		// return createElement(ElementButton, {}, icon ? createElement(icon, {}) : null, props.label)
		return createElement(ElementButton, {
			label: props.label,
			icon: props.icon,
			actions: props.actions,
			api: this._context.api,
			snackbarSuccess: props.snackbarSuccess,
			snackbarError: props.snackbarError,
			confirmBox: props.confirmBox,
			reloadDataTable: props.reloadDataTable	
		})
	}
}