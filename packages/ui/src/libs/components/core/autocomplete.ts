import { createElement, type JSX } from "react";
import { AutocompleteF2 } from "../form";
import type { AutocompleteElement, IElement } from "../@types";
import type { TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import { ElementContext } from "./elementBuilder";

export class Autocomplete<M extends TModelMaster, A extends TApiMaster<M>>
  implements IElement
{
  constructor(private _context: ElementContext<M, A>) {}

  public create(): JSX.Element {
    const props = this._context.props as AutocompleteElement;
    return createElement(AutocompleteF2, {
      name: props.name,
      form: this._context.form,
      searchKey: props.keys.search,
      idKey: props.keys.id,
      displayKey: props.keys.display,
      errorMessage: props.errorMessage,
      api: this._context.api,
      canObserve: props.canObserve,
      observeTo: props.observeTo,
      apiInfo: props.api,
      // defaultData: props.defaultData ?? {},
      options: [], // Add required options property
    });
  }
}
