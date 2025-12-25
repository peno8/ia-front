import { Tabs, rem } from "@mantine/core";
import { useContext } from "react";
import { Accordion } from "@mantine/core";
import ScreenerTypeItem from "./screener-type-item";
import {
  CalendarQuarterCheckboxes,
  SectorCheckboxes,
} from "./sector-checkboxes";
import { ScreenerContext } from "../screener-context";

export interface ScreenerTabProps {
  // featureDefs: Array<FeatureDef>
  // fetch: Function
  variationCodeMap: Map<string, string>;
}

export default function ScreenerFeatureTab() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const context = useContext(ScreenerContext);

  const categories = [
    "PROFITABILITY",
    "GROWTH",
    "STABILITY",
    "EFFICIENCY",
    "VALUE",
    "DIVIDEND",
  ];
  const accordionDefault = [""];
  const featureDefMap = new Map();

  for (const featureType of categories) {
    const filtered = context.featureDefs.filter(
      (e) => e.category === featureType
    );
    featureDefMap.set(featureType, filtered);
  }

  return (
    <div className="">
      <Tabs defaultValue="sorting">
        <Tabs.List className="dark:text-sky-300">
          <Tabs.Tab value="sorting" className="dark:hover:bg-[--bg-dark-hover]">
            Sorting Variables
          </Tabs.Tab>
          <Tabs.Tab
            value="exchange"
            className="dark:hover:bg-[--bg-dark-hover]"
          >
            Country, Exg & Ind
          </Tabs.Tab>
          <Tabs.Tab value="cq" className="dark:hover:bg-[--bg-dark-hover]">
            Quarter
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="sorting">
          <div className="flex flex-col">
            <Accordion
              multiple
              defaultValue={accordionDefault}
              styles={{
                content: { paddingTop: 0 },
              }}
            >
              {categories.map((category) => (
                <ScreenerTypeItem
                  name={category}
                  key={category}
                  featureDefs={featureDefMap.get(category)}
                ></ScreenerTypeItem>
              ))}
            </Accordion>
          </div>
        </Tabs.Panel>
        {/* <Tabs.Panel value="country">
                    <CalendarQuarterCheckboxes />
                </Tabs.Panel> */}
        <Tabs.Panel value="exchange">
          <SectorCheckboxes />
        </Tabs.Panel>

        <Tabs.Panel value="cq">
          <CalendarQuarterCheckboxes />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
