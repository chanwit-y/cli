import type { TModelMaster } from "../../model/master";
import { ApiFactory, HttpClientFactory } from "../../api";
import { ApiMaster, type TApiMaster } from "../../api/APIMaster";
import { ContainerBuilder } from "./containerBuilder";

// import { model } from "./mock/sourceApp/model";
// import { api } from "./mock/sourceApp/api";
// import {  containerSourceAppList } from "./mock/sourceApp/container";

import { model } from "./mock/company/model";
import { api } from "./mock/company/api";
import {  containerCompanyList } from "./mock/company/container";
import type { IAuthContext } from "../../auth/@types";
import { Env } from "../../auth/azure/Env";
import { getAccessToken } from "../../auth/azure/MsalInstance";

class Core {
	// Move to config
	private _http = new HttpClientFactory(
		Env.API_URL || "",
		getAccessToken,
		"1.0.0",
		120000,
	);
	private _apiFactory = new ApiFactory(this._http, {});

	private _modelConfig: TModelMaster = model;
	private _apiConfig: TApiMaster<typeof model> = api as TApiMaster<typeof model>;
	private _apis: ApiMaster<typeof this._modelConfig, typeof this._apiConfig> = new ApiMaster(this._modelConfig, this._apiConfig, this._apiFactory);

	private _hookAuthCtx?: () => IAuthContext<any>;

	constructor() {}

	public useAuthCtx(hookAuthCtx: () => IAuthContext<any>): Core {
		this._hookAuthCtx = hookAuthCtx;
		return this;
	}

	public run() {
		return (new ContainerBuilder(containerCompanyList, this._apis)).draw(true, true)
	}
}

export const core = new Core();