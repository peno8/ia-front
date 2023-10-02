import { Accordion } from "@mantine/core";
import { CategoryCharts } from "./chart/feature-charts";
import { categories } from "../screener/screener-store";
import { useState } from "react";


export default function AnalysisAccordion({featureData}) {
    const [value, setValue] = useState<string[]>(['SIZE']);
    const [panelOpened, setPanelOpened] = useState<string[]>(['SIZE']);

    function updateAccordionValue(value) {
        console.log(value);
        setValue(value);
        if(value.length > 0 && !panelOpened.includes(value[value.length -1])) {
            panelOpened.push(value[value.length -1])
            setPanelOpened(panelOpened);
        }
        console.log(panelOpened);
    }

    return (
        <Accordion multiple value={value} className="w-[1000px]" onChange={updateAccordionValue}>
            {categories.map(c => (
              <Accordion.Item key={c} value={c}>
                <Accordion.Control >{c}</Accordion.Control>
                <Accordion.Panel>
                  {panelOpened.includes(c) ? <CategoryCharts category={c} featureData={featureData} /> : null}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
    )
}