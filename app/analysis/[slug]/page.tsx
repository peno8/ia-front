import AnalysisContent from "./analysis-content";
import { featureDefsStringStore } from "../../screener/screener-store";
import { getMetadata } from "../../app.store";

export default async function AnalysisPage({ params }: { params: { slug: string } }) {
  
  const featureDefsJson = featureDefsStringStore.getState();
  const metadata = await getMetadata();
  console.log(metadata);
  return (
    <AnalysisContent featureDefsJson={featureDefsJson} symbol={params.slug} metadata={metadata}></AnalysisContent>
  )
}