import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { TModelMaster } from "../../model/master";
import { ApiFactory, HttpClientFactory } from "../../api";
import { model } from "./mock/model";
import { api } from "./mock/api";
import { ApiMaster, type TApiMaster } from "../../api/APIMaster";
import { Builder } from "./builder";
import {  containers } from "./mock/box";
import type { Subject } from "rxjs";


type CoreContextType = {
	observeTable: Record<string, any>;
	updataObserveTable: (key: string, value: any) => void;
}

const CoreContext = createContext<CoreContextType>({} as CoreContextType);

type CoreProviderProps = {
	children: ReactNode;
}

export const CoreProvider = ({ children }: CoreProviderProps) => {

	const [observeTable, setObserveTable] = useState<Record<string, Subject<unknown>>>({});

	const updataObserveTable = useCallback((key: string, value: any) => {
		setObserveTable((prev) => ({ ...prev, [key]: value }));
	}, []);



	return <CoreContext.Provider value={{ observeTable, updataObserveTable }}>
		{children}
		<hr />
		<h2>Observe Table</h2>
		<pre>{JSON.stringify(observeTable, null, 2)}</pre>
	</CoreContext.Provider>;
};

export const useCore = () => {
	const context = useContext(CoreContext);
	if (!context) {
		throw new Error('usePage must be used within a PageProvider');
	}
	return context;
};
class Core {
	// Move to config
	private _http = new HttpClientFactory(
		`http://localhost:3001`,
		async () => "",
		"1.0.0",
		120000,
	);
	private _apiFactory = new ApiFactory(this._http, {});

	private _modelConfig: TModelMaster = model;
	private _apiConfig: TApiMaster<typeof model> = api as TApiMaster<typeof model>;
	private _apis: ApiMaster<typeof this._modelConfig, typeof this._apiConfig> = new ApiMaster(this._modelConfig, this._apiConfig, this._apiFactory);

	constructor() { }

	public run() {
		return (new Builder(containers, this._apis)).draw()
	}
}

export const core = new Core();