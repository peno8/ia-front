'use client'

import { useEffect } from "react";
import { featureDataStore, fetchFeatureData } from "./analysis-store";
import { setFeatureDefsStore } from "../../screener/screener-store";
import AnalysisAccordion from "./analysis-accordion";
import { getCompanyDef } from "@/app/app.store";
import StockDescription from "./stock-desc";
import LoadingOveray from "@/app/component/util/loadingOveray";

export default function AnalysisContent({ featureDefsJson, symbol }: { featureDefsJson: string, symbol: string }) {
    useEffect(() => {
        fetchFeatureData(symbol)
    }, [])

    setFeatureDefsStore(featureDefsJson);
    const companyDef = getCompanyDef(symbol)!;
    const featureData = featureDataStore((state) => state.data);
    
    return (
        <div className="relative w-full">
            <div className="analysis-area">
                {featureData ?
                    <div className="w-[900px]">
                        <StockDescription cd={companyDef} featureData={featureData}/>
                        <div className="m-2">
                            {featureData.feature ? <AnalysisAccordion featureData={featureData} /> : null}
                        </div>
                    </div> : null
                }
                <LoadingOveray></LoadingOveray>
            </div>
        </div>
    )
}

