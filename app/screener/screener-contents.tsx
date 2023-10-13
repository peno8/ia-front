'use client'

import { FeatureDef, featureDefs, fetchScreenerData, setFeatureDefsStore, variationCodeMap, tableDataStore } from "./screener-store"
import ScreenerTab from "./tab/screener-tab";
import { screenerDefsStore, fetchStatusStore } from "../app.store";
import ScreenerLayer from "./screener-layer";
import CornerDialog from "../component/util/dialog";
import { usePathname } from "next/navigation";
import { Loader } from "@mantine/core";
import LoadingOveray from "../component/util/loadingOveray";

export default function ScreenerContent({ featureDefsJson, screenerDefStr }: { featureDefsJson: string, screenerDefStr: string }) {
    // console.log(usePathname());
    setFeatureDefsStore(featureDefsJson);
    
    const screenerDefs = JSON.parse(screenerDefStr);

    screenerDefsStore.setState(screenerDefs);

    return (
        <>
            <div className="relative w-full">
            {/* <div className="relative w-full h-[1000px] overflow-auto"> */}
                <ScreenerLayer featureDefs={featureDefs!} variationCodeMap={variationCodeMap!}>
                    <ScreenerTab featureDefs={featureDefs!} screenerDefs={screenerDefs} variationCodeMap={variationCodeMap!} fetch={fetchScreenerData}></ScreenerTab>
                </ScreenerLayer>
                <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
                <div></div>
                <LoadingOveray></LoadingOveray>
            </div>
        </>
    )
}
