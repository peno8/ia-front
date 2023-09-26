import ScreenerContent from "./screener-contents";
import { featureDefsStringStore } from "./screener-store";
import { readFileFromSharedDist } from "../utils";

const featureDefsJson = featureDefsStringStore.getState();
// console.log(featureDefsJson);
const naicsStr = readFileFromSharedDist(process.env.NAICS_CODES_FILE);


export default function SreenerPage() {

  return (
    <ScreenerContent featureDefsJson={featureDefsJson} naicsStr={naicsStr}></ScreenerContent>
  )
}