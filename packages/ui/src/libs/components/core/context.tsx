import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Subject } from "rxjs";

type CoreContextType = {
	observeTable: Record<string, any>;
	addObserveTable: (key: string) => void;
}

const Context = createContext<CoreContextType>({} as CoreContextType);

type CoreProviderProps = {
	children: ReactNode;
}

export const Provider = ({ children }: CoreProviderProps) => {

	const [observeTable, setObserveTable] = useState<Record<string, Subject<unknown>>>({});
	const addObserveTable = useCallback((key: string) => {
		setObserveTable((prev) => ({ ...prev, [key]: new Subject<unknown>() }));
	}, []);

	useEffect(() => {
		console.log('init provider')
	}, [])



	return <Context.Provider value={{ observeTable, addObserveTable }}>
		{children}
		<pre>
			{JSON.stringify(observeTable, null, 2)}
		</pre>
	</Context.Provider>;
};

export const useCore = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('usePage must be used within a PageProvider');
	}
	return context;
};