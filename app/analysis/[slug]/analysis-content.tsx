'use client'

import { useEffect, useRef, useState } from "react";
import { featureDataStore, fetchFeatureData } from "./analysis-store";

import * as d3 from "d3";
import PercentileChart from "./chart/percentile-chart";
import { featureDefsMapByCategory, getFeatureDef, setFeatureDefsStore, variationCodeMap, categories } from "../../screener/screener-store";
import BarChart from "./chart/bar-chart";
import FeatureCharts, { CategoryCharts } from "./chart/feature-charts";
import { Accordion } from "@mantine/core";
import AnalysisAccordion from "./analysis-accordion";
import { getCompanyDef } from "@/app/app.store";
import StockDescription from "./stock-desc";

export default function AnalysisContent({ featureDefsJson, symbol }: { featureDefsJson: string, symbol: string }) {
    useEffect(() => {
        fetchFeatureData(symbol)
    }, [])

    setFeatureDefsStore(featureDefsJson);
    const companyDef = getCompanyDef(symbol)!;
    const featureData = featureDataStore((state) => state.data);

    return (
        <>
            {featureData ?
                <div>
                    <StockDescription cd={companyDef} featureData={featureData}/>
                    <div className="m-2">
                        {featureData.feature ? <AnalysisAccordion featureData={featureData} /> : null}
                    </div>
                </div> : null
            }
        </>
    )
}

