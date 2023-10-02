import { featureDefsMapByCategory, getFeatureDef } from "@/app/screener/screener-store";
import BarChart from "./bar-chart";
import PercentileChart from "./percentile-chart";
import BarChartContainer from "./bar-chart";

export default function FeatureCharts({ symbol, category, featureDef, featureData, stockPercentile, sectorPercentile }) {
    // console.log(featureDef);

    console.log('FeatureCharts')

    // const variationLabelMap = new Map(featureDef.variations.map(e => [e.code, e.variations.join(', ')]));
    featureDef.variations.sort((a, b) => a.displayRank - b.displayRank);
    const variationLabels = featureDef.variations.map(e => { return { value: e.code, label: e.variations.join(', ') } });
    // console.log(variationLabels);
    
    return (
        <div>
            
            <div className="flex flex-row items-end">
                <BarChartContainer featureDef={featureDef} data={featureData} category={category} variationLabels={variationLabels}></BarChartContainer>
                <PercentileChart symbol={symbol} category={category} featureDef={featureDef} stockPercentile={stockPercentile} sectorPercentile={sectorPercentile} variationLabels={variationLabels}></PercentileChart>
            </div>
        </div>
    )
}

export function CategoryCharts({category, featureData}) {
    console.log(category);

    const categoryFeatureDefs =  featureDefsMapByCategory!.get(category)!
    categoryFeatureDefs.sort((a, b) => a.displayRank - b.displayRank);
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
                    featureData.feature.features.filter(e => variationCodes.includes(e.key)) : [];

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