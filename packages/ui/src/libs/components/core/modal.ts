import { createElement, type JSX, type ReactNode } from "react";
import { Modal as ModalComponent, type ModalProps } from "../Modal";
import type {
  ButtonElement,
  IElement,
  ModalElement,
  TElement,
} from "../@types";
import { ElementContext } from "./elementBuilder";
import { ContainerBuilder } from "./containerBuilder";
import type { TModelMaster } from "../../model/master";
import type { TApiMaster } from "../../api/APIMaster";
import { Button } from "./button";
import { createPortal } from "react-dom";

export class Modal<M extends TModelMaster, A extends TApiMaster<M>>
  implements IElement
{
  constructor(private _context: ElementContext<M, A>) {}

  create(): JSX.Element {
    const props = this._context.props as ModalElement;
    if (!this._context.apis) throw new Error("API is required for modal");
    const container = new ContainerBuilder(
      [props.container],
      this._context.apis
    );

    // const trigger = new ElementContext(props.trigger as TElement);

    // const trigger = new ElementContext(props.trigger).build("button");
    // const triggerCtx = new ElementContext(props.trigger)
    // const trigger = new Button().create();

    return createElement<ModalProps>(
      ModalComponent,
      {
        // trigger: trigger.build("button")?.create(),
        trigger: props.trigger,
        title: props.title,
        // description: props.description,
        maxWidth: props.maxWidth,
      },
      container.draw()
    );
  }
}
