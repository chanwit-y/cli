import type { TModelMaster } from "../../model/master";
import { ApiFactory, HttpClientFactory } from "../../api";
import { ApiMaster, type TApiMaster } from "../../api/APIMaster";
import { ContainerBuilder } from "./containerBuilder";

import { model } from "./mock/sourceApp/model";
import { api } from "./mock/sourceApp/api";
import {  containerSourceAppList } from "./mock/sourceApp/container";


class Core {
	// Move to config
	private _http = new HttpClientFactory(
		import.meta.env.VITE_OE_API_URL || "",
		async () => import.meta.env.VITE_TOKEN || "",
		"1.0.0",
		120000,
	);
	private _apiFactory = new ApiFactory(this._http, {});

	private _modelConfig: TModelMaster = model;
	private _apiConfig: TApiMaster<typeof model> = api as TApiMaster<typeof model>;
	private _apis: ApiMaster<typeof this._modelConfig, typeof this._apiConfig> = new ApiMaster(this._modelConfig, this._apiConfig, this._apiFactory);

	constructor() {}

	public run() {
		return (new ContainerBuilder(containerSourceAppList, this._apis)).draw()
	}
}

export const core = new Core();