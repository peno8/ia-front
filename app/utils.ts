import { readFileSync } from "fs";
import { CompanyDef } from "./app.store";
import { FeatureDef } from "./screener/screener-store";

export function readFileFromSharedDist(filename: string | undefined) {
  console.log(process.env.DATA_ROOT);
  const buffer = readFileSync(process.env.DATA_ROOT +  '/' + filename);
  const jsonStr = buffer.toString();
  return jsonStr;
}

function getMaxScreenerVariableNum(): number {
  // const str = process.env.MAX_SCREENER_VARIABLES ? process.env.MAX_SCREENER_VARIABLES : throw new Error('Parameter is not a number!');;
  if(process.env.NEXT_PUBLIC_MAX_SCREENER_VARIABLES) {
    return parseInt(process.env.NEXT_PUBLIC_MAX_SCREENER_VARIABLES);
  } else {
    throw new Error('MAX_SCREENER_VARIABLES is Empty!!');
    // return 5;
  }
}

export function formatPercent(v: number) {
  return (v * 100).toFixed(1);
}

export function formatNumber(category: string, v: number) {
  if(category === 'SIZE') return `${(v / 10000).toFixed(0)}`
  else return `${formatPercent(v)}%`
}

export function formatNumberWithDef(featureDef: FeatureDef, value: number) {
  let prec = 1
  let unit = "%"
  if (featureDef.featureType === 'MILLION') {
    if(value >= 10000000) {
        prec = 1000000
        unit = "T"
    } else if(value >= 10000) {
        prec = 1000
        unit = "B"
    } else {
      unit = "M"
    }
  } else if (featureDef.featureType === 'NOMINAL') {
    if(value >= 10000000) {
      prec = 1000000
      unit = "M"
    } else if(value >= 10000) {
        prec = 1000
        unit = "K"
    } else {
      unit = ""
    }
  } else if(featureDef.featureType === 'RATIO') {
    unit = ""  
  }
  if (featureDef.featureType === 'RATIO') {
    return `${value.toFixed(1)}${unit}`  
  } else if (featureDef.featureType === 'PERCENT') {
    return `${(value * 100).toFixed(1)}${unit}`  
  } else {
    return `${(value / prec).toFixed(0)}${unit}`
  }
  
}

export function formatNumber2(v: number, denom: number, decimal: number = 0) {
  return `${(v / denom).toFixed(decimal)}`
}

export const maxScreenerVariableNum = getMaxScreenerVariableNum();

export function getRequest(jsonStr: string, url: string) {
  return new Request(url,
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