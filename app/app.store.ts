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

export interface Fetchstatus {
    isLoading: boolean,
    setLoading: Function,
    setFinished: Function
}

export const fetchStatusStore = create<Fetchstatus>((set) => ({
    isLoading: false,
    setLoading: () => set(() => ({ isLoading: true})),
    setFinished: () => set({ isLoading: false }),
  }))

export const dialogStore = create<{ opened: boolean, closeDialog: Function, openDialog: Function }>((set) => ({
    opened: false,
    closeDialog: () => {
        set({ opened: false })
    },
    openDialog: () => {
        set({ opened: true })
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

export let companyDefList: CompanyDef[] = [];

export let companyDefMap: Map<string, CompanyDef> = new Map();

export const getCompanyDef = (symbol: string) => companyDefList.find(e => e.sb == symbol);

export type AppMetadata = {
    DATE: string
    CURRENT_QT: string
    LAST_QT: string
}

export const appMetadataStore = create<AppMetadata | null>(() => (null));

// export const companyDefStore = create<{ data: CompanyDef[] } | null>(() => ({ data: [] }));

export function setCompanyDefs(str: string) {
    if (companyDefList.length === 0) {
        const list: CompanyDef[] = JSON.parse(str);
        const map = new Map(list.map(e => [e.sb, e]));
        // companyDefStore.setState({ data: json });
        companyDefList = list;
        companyDefMap = map;
    }
}

