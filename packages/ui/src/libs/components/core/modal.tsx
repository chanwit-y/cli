import { createElement, type JSX, type ReactNode } from "react";
import { Modal as ModalComponent, type ModalProps } from "../Modal";
import type { APIFunction, IElement, ModalElement } from "../@types";

export class Modal implements IElement {

	constructor(
		private _config: ModalElement,
		private _trigger: ReactNode,
		private _content: ReactNode) { }

	setForm(form: any): void {
		throw new Error("Method not implemented.");
	}

	setAPI(api: APIFunction): void {
		throw new Error("Method not implemented.");
	}

	create(): JSX.Element {
		return createElement<ModalProps>(ModalComponent, {
			trigger: this._trigger,
			title: this._config.title,
			description: this._config.description
		}, this._content)
	}

}