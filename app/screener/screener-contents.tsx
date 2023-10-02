'use client'

import { FeatureDef, featureDefs, fetchScreenerData, setFeatureDefsStore, variationCodeMap } from "./screener-store"
import ScreenerTab from "./tab/screener-tab";
import { screenerDefsStore } from "../app.store";
import ScreenerLayer from "./screener-layer";
import CornerDialog from "../component/util/dialog";

export default function ScreenerContent({ featureDefsJson, screenerDefStr }: { featureDefsJson: string, screenerDefStr: string }) {

    // const featureDefs: FeatureDef[] = JSON.parse(featureDefsJson);
    // const variationCodeMap = new Map(featureDefs.flatMap(e => e.variations.map(v => [v.code, e.code])))
    setFeatureDefsStore(featureDefsJson);
    // setVariationCodeMapStore(variationCodeMap);
    const screenerDefs = JSON.parse(screenerDefStr);

    screenerDefsStore.setState(screenerDefs);

    return (
        <>
            <ScreenerLayer featureDefs={featureDefs!} variationCodeMap={variationCodeMap!}>
                <ScreenerTab featureDefs={featureDefs!} screenerDefs={screenerDefs} variationCodeMap={variationCodeMap!} fetch={fetchScreenerData}></ScreenerTab>
            </ScreenerLayer>
            <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
        </>
    )
}