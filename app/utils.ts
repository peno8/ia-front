import { readFileSync } from "fs";
import { CompanyDef } from "./app.store";

export function readFileFromSharedDist(filename: string | undefined) {
  // console.log(process.env.DATA_ROOT);
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