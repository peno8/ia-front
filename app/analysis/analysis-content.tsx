'use client'

import { useEffect, useRef, useState } from "react";
import { readFileFromSharedDist } from "../utils";
import { featureDataStore, fetchFeatureData } from "./analysis-store";

import * as d3 from "d3";
import PercentileChart from "./chart/percentile-chart";
import { featureDefsMapByCategory, getFeatureDef, setFeatureDefsStore, variationCodeMap, categories } from "../screener/screener-store";
import BarChart from "./chart/bar-chart";
import FeatureCharts, { CategoryCharts } from "./chart/feature-charts";
import { Accordion } from "@mantine/core";
import AnalysisAccordion from "./analysis-accordion";

export default function AnalysisContent({ featureDefsJson }: { featureDefsJson: string }) {
  useEffect(() => {
    //   const get = async () => {
        
    //     let data = await GET(getRequest('AAPL'));
    //     featureDataStore.setState({ data: data });
    //     console.log(data);
    //     // return data;
    // }
    // get();
      
      fetchFeatureData('AAPL')
  }, [])

  setFeatureDefsStore(featureDefsJson);

  const featureData = featureDataStore((state) => state.data);
  console.log('AnalysisContent');
  console.log(featureData);

  // const percentileData = [
  //   {feature: 'E', v: 10065944000, p: 0.5474613686534217},
  //   {feature: 'GW|A', v: 0.009444, p: 0.08549222797927461}
  // ]

  // const sectorPercentileData = [
  //   {feature: 'E', v: 9065944000, p: 0.5001},
  //   {feature: 'GW|A', v: 0.029444, p: 0.499}
  // ]

  // const featureCode = 'NI_R_R';

  // const featureDef = getFeatureDef(featureCode);
  // // export const categories = ['SIZE', 'PROFITABILITY', 'GROWTH', 'STABILITY', 'EFFICIENCY'];

  // const profitRatioVars =  featureDefsMapByCategory!.get('PROFITABILITY')!.find(e => e.code === 'NI_R_R')!.variations.map(e => e.code);
  // const stockPercentile = featureData.stockPercentile ? 
  // Object.entries(featureData.stockPercentile.percentiles).filter(e => profitRatioVars.includes(e[0])) : [];

  // const sectorPercentile = featureData.sectorPercentile ? 
  // Object.entries(featureData.sectorPercentile.percentiles).filter(e => profitRatioVars.includes(e[0])) : [];

  // const features = featureData.feature ? 
  //   featureData.feature.features.filter(e => profitRatioVars.includes(e.key)) : [];

  // console.log(features);

  return (
    <>
    {featureData ? 
      <div>
      <div>{featureData.symbol}</div>
      <div>
          {/* {featureData.feature? <BarChart data={featureData.feature.features.find(e => e.key === 'NI_T|R_T').features}></BarChart> : null} */}
          {/* {featureData.feature? <FeatureCharts featureDef={featureDef} data={features}
            stockPercentile={stockPercentile} sectorPercentile={sectorPercentile}
          ></FeatureCharts> : null} */}
          {/* {featureData.feature? <BarChart featureCode={feature} data={features}></BarChart> : null} */}
          {/* {featureData.feature ? <CategoryCharts category={'STABILITY'} featureData={featureData} ></CategoryCharts> : null} */}
          {featureData.feature ? <AnalysisAccordion featureData={featureData} /> : null }
          {/* {featureData.feature ? <Accordion defaultValue="SIZE">
             {categories.slice(1,2).map(c => (
               <Accordion.Item key={c} value={c}>
                 <Accordion.Control >{c}</Accordion.Control>
                 <Accordion.Panel>
                   <CategoryCharts category={c} featureData={featureData} />
                 </Accordion.Panel>
               </Accordion.Item>
             ))}
           </Accordion> : null} */}
      </div>
      <div>
        {/* {featureData.stockPercentile? <PercentileChart stockPercentile={stockPercentile} sectorPercentile={sectorPercentile}></PercentileChart> : null} */}
        
      </div>
      </div> : null
      }
    </>
  )
}

