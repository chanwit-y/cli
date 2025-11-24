import type { AzureAuthContext, IAuthContext } from "./@types";

import { createContext } from "react";

export const createAuthContext: AzureAuthContext = <T extends any>() =>
	createContext<IAuthContext<T>>({} as IAuthContext<T>);