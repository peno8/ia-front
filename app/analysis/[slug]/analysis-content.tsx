'use client'

import { useContext, useEffect } from "react";
import { featureDataStore, fetchFeatureData } from "./analysis-store";
import { setFeatureDefsStore } from "../../screener/screener-store";
import AnalysisAccordion from "./analysis-accordion";
import { AppMetadata, getCompanyDef } from "@/app/app.store";
import StockDescription from "./stock-desc";
import LoadingOveray from "@/app/component/util/loadingOveray";
import { MetadataContext } from "../metadata-context";

export default function AnalysisContent({ featureDefsJson, symbol, metadata }: { featureDefsJson: string, symbol: string, metadata: AppMetadata }) {
    
    const context = {
        metadata: metadata
    }
      
    useEffect(() => {
        fetchFeatureData(symbol, metadata.CURRENT_QT)
    }, [])

    setFeatureDefsStore(featureDefsJson);
    const companyDef = getCompanyDef(symbol)!;
    const featureData = featureDataStore((state) => state.data);
    // console.log(featureData)
    return (
        <MetadataContext.Provider value={context}>
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
        </MetadataContext.Provider>
    )
}

