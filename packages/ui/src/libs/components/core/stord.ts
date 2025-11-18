import { create } from "zustand";

type LoadDataTables = {
  fnCtxs: Record<string, Function>,
  updateFnCtxs: (key: string, fn: Function) => void

  

  contextData: Record<string, any>,
  updateContextData: (name: string, selectedRow: Record<string, any>) => void,
  clearCurrentFormSeleted: () => void,
}

export const useStord = create<LoadDataTables>((set) => ({
  fnCtxs: {} as Record<string, Function>,
  updateFnCtxs: (key: string, fn: Function) => set((state: LoadDataTables) => ({ fnCtxs: {  [key]: fn, ...state.fnCtxs } })),

  contextData: {} as Record<string, any>,
  updateContextData: (name: string, selectedRow: Record<string, any>) => set((state) => ({ contextData: { ...state.contextData, [name]: selectedRow } })),
  clearCurrentFormSeleted: () => set(() => ({ contextData: {} })),
}));
