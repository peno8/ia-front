import ScreenerContent from "./screener-contents";
import { featureDefsStringStore } from "./screener-store";
import { readFileFromSharedDist } from "../utils";
import { getMetadata } from "../app.store";

const featureDefsJson = featureDefsStringStore.getState();

const screenerDefStr = readFileFromSharedDist(process.env.SCREENER_DEF_FILE);



export default async function SreenerPage() {
  const metadata = await getMetadata();
  
  return (
    <ScreenerContent metadata={metadata} featureDefsJson={featureDefsJson} screenerDefStr={screenerDefStr}></ScreenerContent>
  )
}