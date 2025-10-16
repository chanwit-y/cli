import { createColumnHelper } from "@tanstack/react-table";
import type { APIFunction, IElement, DataTableElement, ColumnDef } from "../@types";
import { createElement, type JSX } from "react";
import { DataTable2 } from "../DataTable2";

import type { TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { ElementContext } from "./elementBuilder";


export class DataTable<T extends Record<string, any>, M extends TModelMaster, A extends TApiMaster<M>> implements IElement {
  private _columnHelper = createColumnHelper<T>();

  constructor(private _context: ElementContext<M, A>) {
    console.log('init datatable')
   }

  public toColoumDefinition(columns: ColumnDef[]) {
    return columns.map((column) =>
      this._columnHelper.accessor(column.accessor as any, {
        header: column.header,
        enableSorting: column.enableSorting,
        enableColumnFilter: column.enableColumnFilter,
        cell: props => createElement('div', {}, props.row.original[column.accessor as keyof T]),//<>{props.row.original[column.accessor as keyof T]}</>,
        filterFn: (row, columnId, value) => {
          if (!value || value.length === 0) return true;
          return value.includes(String(row.getValue(columnId)));
        },
      })
    );
  }

  create(): JSX.Element {
    const props = this._context.props as DataTableElement;
    return createElement(DataTable2, {
      columns: this.toColoumDefinition(props.columns),
      api: this._context.api,
      canSearchAllColumns: true,
      title: props.title,
    })
  }
}
