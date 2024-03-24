import { Accordion } from "@mantine/core";
import { CategoryCharts } from "./chart/feature-charts";
import { categories } from "../../screener/screener-store";
import { useState } from "react";
import { FeatureData } from "../api/route";


export default function AnalysisAccordion({ featureData }: { featureData: FeatureData }) {
    const [value, setValue] = useState<string[]>(['SUMMARY']);
    const [panelOpened, setPanelOpened] = useState<string[]>(['SUMMARY']);

    function updateAccordionValue(value: string[]) {
        setValue(() => value);
        if (value.length > 0 && !panelOpened.includes(value[value.length - 1])) {
            panelOpened.push(value[value.length - 1])
            setPanelOpened(panelOpened);
        }
    }

    const tabCategories = ['SUMMARY', 'PROFITABILITY', 'GROWTH', 'STABILITY', 'EFFICIENCY', 'SIZE', 'VALUE', 'DIVIDEND'];

    return (
        <Accordion multiple value={value} className="w-[1000px]" onChange={updateAccordionValue}>
            {tabCategories.map(c => (
                <Accordion.Item key={c} value={c} >
                    <Accordion.Control className='dark:text-sky-300 dark:hover:bg-[--bg-dark-hover]'>{c}</Accordion.Control>
                    <Accordion.Panel>
                        {panelOpened.includes(c) ? <CategoryCharts category={c} featureData={featureData} /> : null}
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}