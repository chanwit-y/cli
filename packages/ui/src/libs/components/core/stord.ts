import { create } from "zustand";

type LoadDataTables = {
  loadDataTables: Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => void
}

export const useStord = create<LoadDataTables>((set) => ({
  loadDataTables: {} as Record<string, Function>,
  updateLoadDataTables: (loadDataTables: Record<string, Function>) => set((state) => ({ loadDataTables: { ...state.loadDataTables, ...loadDataTables } })),
}));
