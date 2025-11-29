import { readFileSync } from "fs";

export function readFileFromSharedDist(filename: string | undefined) {
  console.log(process.env.DATA_ROOT);
  const buffer = readFileSync(process.env.DATA_ROOT + '/' + filename);
  const jsonStr = buffer.toString();
  return jsonStr;
}
