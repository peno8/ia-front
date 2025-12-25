"use client";

import {
  FeatureDef,
  fetchScreenerData,
  setFeatureDefsStore,
  selectedFeaturesFormStore,
  categories,
} from "./screener-store";
import ScreenerFeatureTab from "./tab/screener-feature-tab";
import { AppMetadata, ScreenerDef } from "../app.store";
import ScreenerTableArea from "./screener-table-area";
import { ScreenerContext } from "./screener-context";
import { useEffect, useState } from "react";
import styles from "./screener-contents.module.scss";
import ScreenerPanel from "./summary/screener-panel";
import ScreenerButtonArea from "./screener-button-area";
// import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

// ModuleRegistry.registerModules([AllCommunityModule]);

function prepare(json: string, screenerDefStr: string, metadata: AppMetadata) {
  const featureDefs: FeatureDef[] = JSON.parse(json);
  const variationCodeMap = new Map(
    featureDefs.flatMap((e) => e.variations.map((v) => [v.code, e.code]))
  );
  const featureDefsMap = new Map(featureDefs.map((e) => [e.code, e]));

  const mapByCategory = new Map();
  for (const featureType of categories) {
    const filtered = featureDefs.filter((e) => e.category === featureType);
    mapByCategory.set(featureType, filtered);
  }

  const screenerDefs: ScreenerDef[] = JSON.parse(screenerDefStr);
  screenerDefs.sort((a, b) => a.order - b.order);

  return {
    metadata: metadata,
    screenerDefs: screenerDefs,
    featureDefs: featureDefs,
    variationCodeMap: variationCodeMap,
    featureDefsMap: featureDefsMap,
    featureDefsMapByCategory: mapByCategory,
  };
}

export default function ScreenerContent({
  featureDefsJson,
  screenerDefStr,
  metadata,
}: {
  featureDefsJson: string;
  screenerDefStr: string;
  metadata: AppMetadata;
}) {
  setFeatureDefsStore(featureDefsJson);
  selectedFeaturesFormStore((state) => state.resetCq)(metadata.CURRENT_QT);

  const context = prepare(featureDefsJson, screenerDefStr, metadata);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(() => true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ScreenerContext.Provider value={context}>
      <div className={styles.screenerLayout}>
        <div className={styles.screenerPanel}>
          <ScreenerPanel></ScreenerPanel>
          <ScreenerButtonArea fetch={fetchScreenerData}></ScreenerButtonArea>
          <ScreenerFeatureTab></ScreenerFeatureTab>
        </div>
        <div>
          {/* <ScreenerTable></ScreenerTable> */}
          <ScreenerTableArea fetch={fetchScreenerData}></ScreenerTableArea>
        </div>
      </div>
    </ScreenerContext.Provider>
  );
}
