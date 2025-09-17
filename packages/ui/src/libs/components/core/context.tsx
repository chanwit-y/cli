import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ModelFactory, TModelMaster } from "../../model/master";
import { ApiFactory, HttpClientFactory } from "../../api";
import { model } from "./mock/model";
import { api } from "./mock/api";
import { ApiMaster, type TApiMaster } from "../../api/APIMaster";
import { AutocompleteF2 } from "../form";

type CoreContextType = {
	observeTable: Record<string, any>;
	updataObserveTable: (key: string, value: any) => void;
}

const CoreContext = createContext<CoreContextType>({} as CoreContextType);

type CoreProviderProps = {
	children: ReactNode;
}

export const CoreProvider = ({ children }: CoreProviderProps) => {

	const [observeTable, setObserveTable] = useState<Record<string, any>>({});

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

	public async test() {
		const res = await this._apis.api.todos();
		console.log(res);
	}

	public draw(f: any) {

		const apiForAutocomplete = async (params?: { query: Record<string, any>, params: Record<string, any> }) => {
			return (await this._apis.api.todos())["data"];
		};


		return (<div>
			<AutocompleteF2<{ title: string, id: number }>
				{ ...f }
				name="test"
				api={apiForAutocomplete}
				searchKey="title"
				idKey="id"
				displayKey="title"
			/>
		</div>)


	}
}

export const core = new Core();