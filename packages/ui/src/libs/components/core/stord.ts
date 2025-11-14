import { create } from "zustand";

type LoadDataTables = {
  loadDataTables: Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => void

  contextData: Record<string, any>,
  updateContextData: (name: string, selectedRow: Record<string, any>) => void,
  clearCurrentFormSeleted: () => void,
}

export const useStord = create<LoadDataTables>((set) => ({
  loadDataTables: {} as Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => set((state: LoadDataTables) => ({ loadDataTables: { ...state.loadDataTables, ...loadDataTables } })),

  contextData: {} as Record<string, any>,
  updateContextData: (name: string, selectedRow: Record<string, any>) => set((state) => ({ contextData: { ...state.contextData, [name]: selectedRow } })),
  clearCurrentFormSeleted: () => set(() => ({ contextData: {} })),
}));
