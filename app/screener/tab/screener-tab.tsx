import { Button, Tabs, rem } from '@mantine/core';
// import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import { Chip } from '@mantine/core';
import { useState } from 'react';
import { Accordion } from '@mantine/core';
import ScreenerOption from './screener-option';
import ScreenerFeature from './screener-feature';
import ScreenerTypeItem from './screener-type-item';
import { FeatureDef } from '../screener-store';
import ScreenerPanel from '../summary/screener-panel';
import { ScreenerDef } from '@/app/app.store';
import { CalendarQuarterCheckboxes, SectorCheckboxes } from './sector-checkboxes'

// const featureDefs = useFeatureDefs.getState();

interface ScreenerTabProps {
    featureDefs: Array<FeatureDef>
    fetch: Function
    screenerDefs: ScreenerDef[]
    variationCodeMap: Map<string, string>
}

function aaa() {
    console.log('aaaaaa');
}


export default function ScreenerTab(props: ScreenerTabProps) {
    const iconStyle = { width: rem(12), height: rem(12) };

    const categories = ['STABILITY', 'EFFICIENTY', 'GROWTH', 'PROFITABILITY', 'SIZE'];
    const featureDefMap = new Map();
    for (const featureType of categories) {
        const filtered = props.featureDefs.filter(e => e.category === featureType);
        featureDefMap.set(featureType, filtered);
    }

    console.log('ScreenerTab');



    return (
        <div className=''>
            <ScreenerPanel featureDefs={props.featureDefs} screenerDefs={props.screenerDefs} fetch={props.fetch} variationCodeMap={props.variationCodeMap}></ScreenerPanel>
            <Tabs defaultValue="sorting">
                <Tabs.List className='dark:text-sky-300'>
                    <Tabs.Tab value="sorting" >
                        Sorting Variables
                    </Tabs.Tab>
                    <Tabs.Tab value="exchange">
                        Exchange
                    </Tabs.Tab>
                    <Tabs.Tab value="cq">
                        Quarter
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="sorting">
                    <div className='flex flex-col'>
                        <Accordion multiple defaultValue={categories}>
                            {categories.map((category) =>

                                <ScreenerTypeItem name={category} key={category} featureDefs={featureDefMap.get(category)}></ScreenerTypeItem>)}
                        </Accordion>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="exchange">
                    <SectorCheckboxes screenerDefs={props.screenerDefs}></SectorCheckboxes>
                </Tabs.Panel>

                <Tabs.Panel value="cq">
                    <CalendarQuarterCheckboxes></CalendarQuarterCheckboxes>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}