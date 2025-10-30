import { create } from "zustand";

type LoadDataTables = {
  loadDataTables: Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => void

  selectedRow: Record<string, Record<string, any>>,
  updateSelectedRow: (name: string, selectedRow: Record<string, any>) => void

}

export const useStord = create<LoadDataTables>((set) => ({
  loadDataTables: {} as Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => set((state) => ({ loadDataTables: { ...state.loadDataTables, ...loadDataTables } })),
  selectedRow: {} as Record<string, Record<string, any>>,
  updateSelectedRow: (name: string, selectedRow: Record<string, any>) => set((state) => ({ selectedRow: { ...state.selectedRow, [name]: selectedRow } })),
}));
