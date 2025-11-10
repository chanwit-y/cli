import type { DataValue } from "../@types";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Subject } from "rxjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LoadingProvider } from "../context";

type CoreContextType = {
	observeTable: Record<string, any>;
	addObserveTable: (key: string) => void;
	getDataValue: (dv: DataValue) => Subject<unknown> | undefined
}

const Context = createContext<CoreContextType>({} as CoreContextType);

type CoreProviderProps = {
	children: ReactNode;
	isRoot?: boolean;
}

const queryClient = new QueryClient()

export const Provider = ({ children,  isRoot = false }: CoreProviderProps) => {

	const [observeTable, setObserveTable] = useState<Record<string, Subject<unknown>>>({});
	const addObserveTable = useCallback((key: string) => {
		setObserveTable((prev) => ({ ...prev, [key]: new Subject<unknown>() }));
	}, []);


	const getDataValue = useCallback((dv: DataValue) => {
		switch (dv.type) {
			case "variable":
				return undefined;
			case "state":
				return undefined
			case "observe":
				return observeTable[dv.key]
		}
	}, [observeTable]);


	return <Context.Provider value={{ observeTable, addObserveTable, getDataValue }}>
		{
			isRoot ? (
				<LoadingProvider>
					<QueryClientProvider client={queryClient}>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</LoadingProvider>
			) : children
		}
	</Context.Provider>;
};

export const useCore = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('usePage must be used within a PageProvider');
	}
	return context;
};