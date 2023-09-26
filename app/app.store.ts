import { create } from "zustand";

export interface NaicsDef {
  code: string
  desc: string
  sectors: number[]
}

export const naicsCodesStore = create<Array<NaicsDef>>(() => ([]));



export const dialogStore = create<{ opened: boolean, closeDialog: Function, openDialog: Function }>((set) => ({
  opened: false,
  closeDialog: () => {
      set({ opened: false})
  },
  openDialog: () => {
      set({ opened: true})
  },
}));    