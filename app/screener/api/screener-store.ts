import { create } from 'zustand'
import {produce} from "immer"
import { ScreenerApiParam } from './route';

function extractTrueKeys(obj: { [key:string]: boolean }): string[] {
  const trueKeys: string[] = [];
  for (const key in obj) {
    if (obj[key] === true) {
      trueKeys.push(key);
    }
  }
  return trueKeys;
}

export function getScreenerParam(): ScreenerApiParam {
  const from = screenerParamStore.getState().param;
  const to = JSON.parse(JSON.stringify(from));
  to.features = extractTrueKeys(from.features);
  // const nextState = produce(from, draft => {
  //   // @ts-ignore
  //   draft.features = extractTrueKeys(draft.features);
  //   draft
  // })
  return to; 
}

interface ScreenerField {
  param: {
    features: { [keys: string]: boolean }
    cq?: string;
    market?: string;
  }
}

const initScreenerParam = {
  cq: '2023-1Q',
  features: {
    'CA|A': false,
    'L|A': false,
    'R_T_Y': false,
    'OI_T_Q': false,
    'OI_T|R_T': false,
    'OI_T|E': false,
    'NI_T_Y': false,
    'NI_T|R_T': true,
    'OC_Y': false,
    'OC_T|E': false,
    'OC_T|R_T': false
  }
}

export const screenerParamStore = create<ScreenerField>(() => ({
  param: initScreenerParam
}))

export const screenerResult = create(() => ({
  result: []
}))