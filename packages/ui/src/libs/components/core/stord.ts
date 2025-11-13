import { create } from "zustand";

type LoadDataTables = {
  loadDataTables: Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => void

  selectedRow: Record<string, any>,
  updateSelectedRow: (name: string, selectedRow: Record<string, any>) => void,
  clearCurrentFormSeleted: () => void,
}

export const useStord = create<LoadDataTables>((set) => ({
  loadDataTables: {} as Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => set((state: LoadDataTables) => ({ loadDataTables: { ...state.loadDataTables, ...loadDataTables } })),

  selectedRow: {} as Record<string, Record<string, any>>,
  updateSelectedRow: (name: string, selectedRow: Record<string, any>) => set((state) => ({ selectedRow: { ...state.selectedRow, [name]: selectedRow } })),
  clearCurrentFormSeleted: () => set(() => ({ selectedRow: {} })),
}));
