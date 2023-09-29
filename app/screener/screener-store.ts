import { create } from 'zustand'
// import {produce} from "immer"
import { POST, ScreenerApiParam, ScreenerApiResult } from './api/route';

import { readFileSync } from 'fs';
import { produce } from 'immer';
import { maxScreenerVariableNum } from '../utils';
import { dialogStore } from '../app.store';

export interface FeatureVariation {
    code: string
    displayRank: number
    variations: string[]
}

export interface FeatureDef {
    code: string
    desc: string
    category: string
    variations: FeatureVariation[]
    lowerIsBetter: boolean
}

export const toggleDialog = create<{ opened: boolean, openDialog: () => void, closeDialog: () => void }>((set) => ({
    opened: false,
    openDialog: () => set({ opened: true }),
    closeDialog: () => set({ opened: false })
}));

export const featureDefsStringStore = create<string>(() => (''));

export const featureDefsStore = create<Array<FeatureDef> | null>(() => (null));

let featureDefsMap: Map<string, FeatureDef> | null = null;

export const variationCodeMapStore = create<Map<string, string> | null>(() => (null));

let variationCodeMap: Map<string, string> | null = null;

export function setFeatureDefsStore(featureDefs: FeatureDef[]) {
    featureDefsStore.setState(featureDefs);
    featureDefsMap = new Map(featureDefs.map(e => [e.code, e]));
}

export function setVariationCodeMapStore(map: Map<string, string>) {
    variationCodeMapStore.setState(map);
    variationCodeMap = map;
}

function getVariationSortingScheme(code: string) {
    const res = featureDefsMap!.get(variationCodeMap!.get(code)!)?.lowerIsBetter;
    return res === undefined ? true : res;
}

export function selectedVariableText(featureDefs: FeatureDef[], variationCodeMap: Map<string, string>, code: string) {
    const featureDef = featureDefs.find(e => e.code == variationCodeMap.get(code))
    const variationDef = featureDef?.variations.find(v => v.code == code)

    return `${featureDef?.desc} (${variationDef?.variations.join(', ')})`;
}

function extractTrueKeys(obj: { [key: string]: boolean }): string[] {
    const trueKeys: string[] = [];
    for (const key in obj) {
        if (obj[key] === true) {
            trueKeys.push(key);
        }
    }
    return trueKeys;
}

export function getScreenerParam(): ScreenerApiParam {
    const from = screenerFieldsFormStore.getState();
    const to = JSON.parse(JSON.stringify(from));
    to.features = extractTrueKeys(from.features);
    return to;
}

export interface ScreenerFeaturesForm {
    features: { [keys: string]: boolean }
    cq?: string;
    market?: string;
}

export const screenerFieldsFormStore = create<ScreenerFeaturesForm>(() => ({ features: {} }));


export const screenerResult = create(() => ({
    result: []
}))

export interface SelectedFeaturesForm {
    [key: string]: any
    features: { [keys: string]: { lowerIsBetter: boolean } } | { feature: string, lowerIsBetter: boolean }[]
    cq: string;
    exchange?: string;
    sector?: string;
    key: string;
    addOrRemoveByFeature: Function;
    resetLessIsBetter: Function;
    count: number;
    // resetExchange: Function;
    // resetSector: Function;
    resetCq: Function;
    reachedMax: boolean;
    valueChanged: boolean;
    setValueChanged: Function;
    resetAll: Function;
    resetScreenerKey: Function;
}


export const selectedFeaturesFormStore = create<SelectedFeaturesForm>((set, get) =>
({
    features: { 'NI_T|R_T': { lowerIsBetter: false } },
    cq: '2023-Q2',
    key: 'ALL',
    exchange: 'ALL',
    count: 1,
    reachedMax: false,
    valueChanged: false,
    addOrRemoveByFeature: (code: string) => {

        if (!(code in get().features) && get().count >= maxScreenerVariableNum) {
            dialogStore.getState().openDialog();
        } else {
            set(produce((state) => {
                if (code in state.features) {
                    delete state.features[code];
                    state.count = state.count - 1;
                    state.valueChanged = true;
                } else {
                    const isLower = getVariationSortingScheme(code);
                    state.features[code] = { lowerIsBetter: isLower }
                    state.count = state.count + 1;
                    state.valueChanged = true;
                    if (state.count >= maxScreenerVariableNum) {
                        state.reachedMax = true;
                    }
                }
            }))
        }
    },
    resetLessIsBetter: (code: string) => {
        set(produce((state) => {
            state.features[code].lowerIsBetter = !state.features[code].lowerIsBetter;
        }))
    },
    // resetExchange: (exchange: string) => {
    //     set(produce((state) => {
    //         state.naics = null;
    //         state.valueChanged = true;
    //         state.exchange = exchange;
    //     }))
    // },
    // resetSector: (sector: string) => {
    //     set(produce((state) => {
    //         state.exchange = null;
    //         state.valueChanged = true;
    //         state.sector = sector;
    //     }))
    // },
    resetScreenerKey: (key: string) => {
        set(produce((state) => {
            state.exchange = null;
            state.valueChanged = true;
            state.key = key;
        }))
    },
    resetCq: (cq: string) => {
        set(produce((state) => {
            state.valueChanged = true;
            state.cq = cq;
        }))
    },
    setValueChanged: () => {
        set(produce((state) => {
            state.valueChanged = false;
        }))
    },
    resetAll: () => {
        set(produce((state) => {
            state.features = { 'NI_T|R_T': { lowerIsBetter: false } };
            state.cq = '2023-Q2';
            state.key = 'ALL';
            state.count = 1;
            state.reachedMax = false;
            state.valueChanged = false;
        }))
    }
}))

function getSelectedScreenerParam() {
    const from = selectedFeaturesFormStore.getState();
    console.log(from);
    const to: SelectedFeaturesForm = JSON.parse(JSON.stringify(from));
    console.log(to);
    const entries: [string, { lowerIsBetter: boolean }][] = Object.entries(to.features);
    const updatedFeatureObj = entries.map((e) => ({ feature: e[0], lowerIsBetter: e[1].lowerIsBetter }))
    to.features = updatedFeatureObj;

    console.log(to);

    return to;
}
function getRequest(jsonStr: string) {
    return new Request('http://127.0.0.1:8080/api/percentile/ranks',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonStr,
            method: 'POST',
            cache: 'no-store'

        }
    )
}
export const tableDataStore = create<{ response: ScreenerApiResult[], request: SelectedFeaturesForm }>(() => ({}));

export function fetchScreenerData() {
    const get = async () => {
        const request = getSelectedScreenerParam();
        let data = await POST(getRequest(JSON.stringify(request)));
        console.log(data)
        tableDataStore.setState({ response: data, request: request });
    }
    get();
}



