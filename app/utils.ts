import { readFileSync } from "fs";
import { CompanyDef } from "./app.store";

export function readFileFromSharedDist(filename: string | undefined) {
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

export const maxScreenerVariableNum = getMaxScreenerVariableNum();