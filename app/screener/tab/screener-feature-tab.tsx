import { Button, Tabs, rem } from '@mantine/core';
// import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { Switch } from '@mantine/core';
import { Chip } from '@mantine/core';
import { useContext, useState } from 'react';
import { Accordion } from '@mantine/core';
import ScreenerOption from './screener-option';
import ScreenerFeature from './screener-feature';
import ScreenerTypeItem from './screener-type-item';
import { FeatureDef, featureDefs } from '../screener-store';
import ScreenerPanel from '../summary/screener-panel';
import { ScreenerDef } from '@/app/app.store';
import { CalendarQuarterCheckboxes, SectorCheckboxes } from './sector-checkboxes'
import ScreenerContent from '../screener-contents';
import { ScreenerContext } from '../screener-context';

export interface ScreenerTabProps {
    //featureDefs: Array<FeatureDef>
    // fetch: Function
    variationCodeMap: Map<string, string>
}

export default function ScreenerFeatureTab() {
    const iconStyle = { width: rem(12), height: rem(12) };
    const context = useContext(ScreenerContext);

    const categories = ['PROFITABILITY', 'GROWTH', 'STABILITY', 'EFFICIENCY', 'SIZE'];
    const accordionDefault = ['PROFITABILITY'];
    const featureDefMap = new Map();
    
    for (const featureType of categories) {
        const filtered = context.featureDefs.filter(e => e.category === featureType);
        featureDefMap.set(featureType, filtered);
    }

    return (
        <div className=''>
            

            <Tabs defaultValue="sorting">
                <Tabs.List className='dark:text-sky-300'>
                    <Tabs.Tab value="sorting" className='dark:hover:bg-[--bg-dark-hover]'>
                        Sorting Variables
                    </Tabs.Tab>
                    <Tabs.Tab value="exchange" className='dark:hover:bg-[--bg-dark-hover]'>
                        Exchange & Industry
                    </Tabs.Tab>
                    <Tabs.Tab value="cq" className='dark:hover:bg-[--bg-dark-hover]'>
                        Quarter
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="sorting">
                    <div className='flex flex-col'>
                        <Accordion multiple defaultValue={accordionDefault} styles={{
                            content: {paddingTop: 0}
                        }}>
                            {categories.map((category) =>
                                <ScreenerTypeItem name={category} key={category} featureDefs={featureDefMap.get(category)}></ScreenerTypeItem>)}
                        </Accordion>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="exchange">
                    <SectorCheckboxes></SectorCheckboxes>
                </Tabs.Panel>

                <Tabs.Panel value="cq">
                    <CalendarQuarterCheckboxes></CalendarQuarterCheckboxes>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}