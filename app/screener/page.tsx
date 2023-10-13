import ScreenerContent from "./screener-contents";
import { featureDefsStringStore } from "./screener-store";
import { readFileFromSharedDist } from "../utils";

const featureDefsJson = featureDefsStringStore.getState();

const screenerDefStr = readFileFromSharedDist(process.env.SCREENER_DEF_FILE);


export default function SreenerPage() {

  return (
    <ScreenerContent featureDefsJson={featureDefsJson} screenerDefStr={screenerDefStr}></ScreenerContent>
  )
}