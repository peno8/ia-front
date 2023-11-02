'use client'

import { FeatureDef, featureDefs, fetchScreenerData, setFeatureDefsStore, variationCodeMap, tableDataStore, selectedFeaturesFormStore, categories } from "./screener-store"
import ScreenerFeatureTab from "./tab/screener-feature-tab";
import { screenerDefsStore, fetchStatusStore, AppMetadata } from "../app.store";
import ScreenerLayer from "./screener-layer";
import CornerDialog from "../component/util/dialog";
import { usePathname } from "next/navigation";
import { Loader } from "@mantine/core";
import LoadingOveray from "../component/util/loadingOveray";
import ScreenerMainTab from "./screener-main-tab";
import { MetadataContext } from "../MetadataContext";
import { ScreenerContext } from "./screener-context";

function prepare(json: string, screenerDefStr: string, metadata: AppMetadata) {
    
    const featureDefs: FeatureDef[] = JSON.parse(json);
    //const map = new Map(featureDefs.flatMap(e => e.variations.map(v => [v.code, e.code])));
    // featureDefsStore.setState(featureDefs);
    // variationCodeMapStore.setState(map);
    // featureDefs  defs: FeatureDef[] = JSON.parse(json);
    const variationCodeMap = new Map(featureDefs.flatMap(e => e.variations.map(v => [v.code, e.code])));
    const featureDefsMap = new Map(featureDefs.map(e => [e.code, e]));

    const mapByCategory = new Map();
    for (const featureType of categories) {
        const filtered = featureDefs.filter(e => e.category === featureType);
        mapByCategory.set(featureType, filtered);
    }
    
    const screenerDefs = JSON.parse(screenerDefStr);

    return {
        metadata: metadata,
        screenerDefs: screenerDefs,
        featureDefs: featureDefs,
        variationCodeMap: variationCodeMap,
        featureDefsMap: featureDefsMap,
        featureDefsMapByCategory: mapByCategory

    }
}

export default function ScreenerContent({ featureDefsJson, screenerDefStr, metadata }: { featureDefsJson: string, screenerDefStr: string, metadata: AppMetadata }) {
    setFeatureDefsStore(featureDefsJson);
    selectedFeaturesFormStore((state) => state.resetCq)(metadata.CURRENT_QT);
    const featureDefs: FeatureDef[] = JSON.parse(featureDefsJson);

    const screenerDefs = JSON.parse(screenerDefStr);

    screenerDefsStore.setState(screenerDefs);

    // const context = {
    //     metadata: metadata,
    //     screenerDefs: screenerDefs,
    //     featureDefs: featureDefs
    // }
    const context = prepare(featureDefsJson, screenerDefStr, metadata);

    return (
        <>
            <ScreenerContext.Provider value={context}>
            <div className="relative screener-main-tab-area">
                <ScreenerMainTab fetch={fetchScreenerData} />
            </div>
            <div className="relative w-full screener-contents">
                <ScreenerLayer fetch={fetchScreenerData}>
                    <ScreenerFeatureTab></ScreenerFeatureTab>
                </ScreenerLayer>
                <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
                <LoadingOveray></LoadingOveray>
            </div>
            {/* </div> */}
            <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
            </ScreenerContext.Provider>
        </>
    )
}
