import { create } from "zustand";
import { readFileFromSharedDist } from "./utils";

// export interface NaicsDef {
//   code: string
//   desc: string
//   sectors: number[]
// }

export interface ScreenerDef {
  key: string
  keyType: string
  value: string,
  desc: string,
  order: number
}

export const screenerDefsStore = create<Array<ScreenerDef>>(() => ([]));



export const dialogStore = create<{ opened: boolean, closeDialog: Function, openDialog: Function }>((set) => ({
  opened: false,
  closeDialog: () => {
      set({ opened: false})
  },
  openDialog: () => {
      set({ opened: true})
  },
}));    

export interface CompanyDef {
  sb: string
  name: string
  cik: string
  exg: string
  sic: string
  desc: string
  div: string
  nai: number
  nd: string
}

let companyDefList = [];

export const companyDefStore = create<{ data: CompanyDef[] } | null>(() => ({data: []}));

export function saveCompanyDef(str: string) {
  const json: CompanyDef[] = JSON.parse(str);
  console.log(json[0])
  companyDefStore.setState({ data: json });
  companyDefList = json;
}

