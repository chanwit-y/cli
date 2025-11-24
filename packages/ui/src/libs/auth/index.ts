import {  createAuthContext, getAzureAuthProvider } from "./azure";

export const azureCtx = createAuthContext<any>();
export const { AuthProvider: AzureAuthProvider, useAuth: useAzureAuth } = getAzureAuthProvider(azureCtx);