'use client'

import { FeatureDef, featureDefs, fetchScreenerData, setFeatureDefsStore, variationCodeMap, tableDataStore } from "./screener-store"
import ScreenerFeatureTab from "./tab/screener-feature-tab";
import { screenerDefsStore, fetchStatusStore } from "../app.store";
import ScreenerLayer from "./screener-layer";
import CornerDialog from "../component/util/dialog";
import { usePathname } from "next/navigation";
import { Loader } from "@mantine/core";
import LoadingOveray from "../component/util/loadingOveray";
import ScreenerMainTab from "./screener-main-tab";

export default function ScreenerContent({ featureDefsJson, screenerDefStr }: { featureDefsJson: string, screenerDefStr: string }) {
    // console.log(usePathname());
    setFeatureDefsStore(featureDefsJson);
    
    const screenerDefs = JSON.parse(screenerDefStr);

    screenerDefsStore.setState(screenerDefs);

    // const innerWidth = window.innerWidth;
    // console.log(innerWidth);

    return (
        <>  
        
            <div className="relative screener-main-tab-area">
            <ScreenerMainTab featureDefs={featureDefs!} screenerDefs={screenerDefs} variationCodeMap={variationCodeMap!} fetch={fetchScreenerData}/>  
                          
            </div>
                
            <div className="relative w-full screener-contents">
            {/* <div className="relative w-full h-[1000px] overflow-auto"> */}
                <ScreenerLayer featureDefs={featureDefs!} variationCodeMap={variationCodeMap!} screenerDefs={screenerDefs} fetch={fetchScreenerData}>
                    <ScreenerFeatureTab featureDefs={featureDefs!} screenerDefs={screenerDefs} variationCodeMap={variationCodeMap!}></ScreenerFeatureTab>
                </ScreenerLayer>
                <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
                <LoadingOveray></LoadingOveray>
            </div>
            {/* </div> */}
            <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
        </>
    )
}
