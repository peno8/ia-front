import AnalysisContent from "./analysis-content";
import { featureDefsStringStore } from "../../screener/screener-store";
import { getMetadata } from "../../app.store";

export default async function AnalysisPage({ params }: { params: { slug: string } }) {
  
  // Next 16
  const { slug } = await params;

  const featureDefsJson = featureDefsStringStore.getState();
  const metadata = await getMetadata();
  console.log(metadata);
  return (
    <AnalysisContent featureDefsJson={featureDefsJson} symbol={slug} metadata={metadata}></AnalysisContent>
  )
}