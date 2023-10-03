import AnalysisContent from "./analysis-content";
import { featureDefsStringStore } from "../../screener/screener-store";


export default function AnalysisPage({ params }: { params: { slug: string } }) {
  
  const featureDefsJson = featureDefsStringStore.getState();

  return (
    <AnalysisContent featureDefsJson={featureDefsJson} symbol={params.slug}></AnalysisContent>
  )
}