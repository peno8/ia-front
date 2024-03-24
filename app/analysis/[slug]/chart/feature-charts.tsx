import { FeatureDef, featureDefs, featureDefsMapByCategory, getFeatureDef } from "@/app/screener/screener-store";
import BarChart from "./bar-chart";
import PercentileChart from "./percentile-chart";
import BarChartContainer from "./bar-chart";
import { FeatureData, FeatureObj, PercentileObj } from "../../api/route";

export type PercentileEntry = 
     [string, {
        v: number
        p: number
    }][]

export default function FeatureCharts({ symbol, category, featureDef, featureData, stockPercentile, sectorPercentile }:
    { symbol: string, category: string, featureDef: FeatureDef, featureData: FeatureObj[], 
        stockPercentile: PercentileEntry, 
        sectorPercentile: PercentileEntry }) {

    featureDef.variations.sort((a, b) => a.displayRank - b.displayRank);
    const variationLabels = featureDef.variations.map(e => { return { value: e.code, label: e.variations.join(', ') } });
    
    return (
        <div>
            
            <div className="flex flex-row items-end">
                <BarChartContainer featureDef={featureDef} data={featureData} category={category} variationLabels={variationLabels}></BarChartContainer>
                <PercentileChart symbol={symbol} category={category} featureDef={featureDef} stockPercentile={stockPercentile} sectorPercentile={sectorPercentile} variationLabels={variationLabels}></PercentileChart>
            </div>
        </div>
    )
}

export function CategoryCharts({category, featureData}: {category: string, featureData: FeatureData}) {

    let categoryFeatureDefs: FeatureDef[] = [];
    if (category !== 'SUMMARY') {
        categoryFeatureDefs = featureDefsMapByCategory!.get(category)!
        categoryFeatureDefs.sort((a, b) => a.displayRank - b.displayRank);
    } else {
        categoryFeatureDefs = featureDefs!.filter(e => e.coreFeatureRank )
        categoryFeatureDefs.sort((a, b) => a.coreFeatureRank! - b.coreFeatureRank!);
    }
    console.log(categoryFeatureDefs)
    const featureCodes =  categoryFeatureDefs.map(e => e.code);

    return (
        <>
            {
                featureCodes.map(c => {
                    const featureDef = getFeatureDef(c)!;
                    const variations = featureDef.variations;
                    variations.sort((a, b) => a.displayRank - b.displayRank);
                    const variationCodes = variations.map(e => e.code);

                    const features = featureData.feature ? 
                    featureData.feature.features.filter(e => variationCodes.includes(e.fName)) : [];

                    const stockPercentile = featureData.stockPercentile ? 
                    Object.entries(featureData.stockPercentile.percentiles).filter(e => variationCodes.includes(e[0])) : [];
                  
                    const sectorPercentile = featureData.sectorPercentile ? 
                    Object.entries(featureData.sectorPercentile.percentiles).filter(e => variationCodes.includes(e[0])) : [];

                    return features.length > 0 ? <FeatureCharts symbol={featureData.feature.symbol} category={category} featureDef={featureDef} featureData={features}
                    stockPercentile={stockPercentile} sectorPercentile={sectorPercentile}/> : null;
                })
            }
        </>
    )

}