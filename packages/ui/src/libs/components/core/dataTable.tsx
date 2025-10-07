import { createColumnHelper } from "@tanstack/react-table";
import type { APIFunction, IElement, DataTableElement } from "../@types";
import { createElement, type JSX } from "react";
import { DataTable2 } from "../DataTable2";


export class DataTable<T extends Record<string, any>> implements IElement {
  private _columnHelper = createColumnHelper<T>();

  constructor(
    private _config: DataTableElement,
    private _api: APIFunction
  ) { }

  public toColoumDefinition() {
    return this._config.columns.map((column) =>
      this._columnHelper.accessor(column.accessor as any, {
        header: column.header,
        enableSorting: column.enableSorting,
        enableColumnFilter: column.enableColumnFilter,
        cell: props => <>{props.row.original[column.accessor as keyof T]}</>,
        filterFn: (row, columnId, value) => {
          if (!value || value.length === 0) return true;
          return value.includes(String(row.getValue(columnId)));
        },
      })
    );
  }

  create(): JSX.Element {
    console.log(this.toColoumDefinition())
    return createElement(DataTable2, {
      columns: this.toColoumDefinition(),
      api: this._api,
      canSearchAllColumns: true,
      title: "Demo",
    })
  }
}
