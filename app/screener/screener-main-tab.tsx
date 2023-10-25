import { Tabs, rem } from '@mantine/core';
import ScreenerFeatureTab, { ScreenerTabProps } from './tab/screener-feature-tab';
import { ReactNode, useState } from 'react';
import ScreenerButtonArea from './screener-button-area';
import ScreenerTable from './screener-table';
import ScreenerTableBox from './screener-table-box';
import ScreenerPanel from './summary/screener-panel';
import { FeatureDef } from './screener-store';
import { ScreenerDef } from '../app.store';
import CornerDialog from '../component/util/dialog';
import LoadingOveray from '../component/util/loadingOveray';

function ScreenerMainTabContent({ opened, children }: { opened: boolean, children: ReactNode }) {
    return (
        opened ? <div className='screener-main-tab-content'>
            {children}
        </div> : <div className='screener-main-tab-content content-none'>
            {children}
        </div>
    )

}

function TabButton(value: string, opened: boolean, onClick: Function) {
    const label = value.substring(0, 1).toLocaleUpperCase() + value.substring(1, value.length);
    return (
        opened ?
            <button className='screener-main-tab-button-item selected ia-hover' key={value} onClick={() => onClick(value)}>{label}</button> :
            <button className='screener-main-tab-button-item ia-hover' key={value} onClick={() => onClick(value)}>{label}</button>
    )
}

export interface ScreenerMainTabProps {
    featureDefs: Array<FeatureDef>
    fetch: Function
    screenerDefs: ScreenerDef[]
    variationCodeMap: Map<string, string>
}

export default function ScreenerMainTab(props: ScreenerMainTabProps) {
    const [tabValue, setTabValue] = useState('table');
    const iconStyle = { width: rem(12), height: rem(12) };
    const tabValues = ['configure', 'selected', 'table'];

    function fetchFromMobileTab() {
        setTabValue('table');
        props.fetch();
    }

    return (
        <div className='relative screener-main-tab'>
            {/* <div className='screener-main-tab-title'>
            Screener
        </div> */}
            <div className='screener-main-tab-buttons'>
                {tabValues.map(v => TabButton(v, tabValue === v, setTabValue))}
            </div>
            <div className='screener-main-tab-contents-area'>
                <ScreenerMainTabContent opened={tabValue === 'configure'}>
                    <ScreenerButtonArea fetch={fetchFromMobileTab}></ScreenerButtonArea>
                    <ScreenerFeatureTab featureDefs={props.featureDefs!} screenerDefs={props.screenerDefs} variationCodeMap={props.variationCodeMap!}></ScreenerFeatureTab>
                </ScreenerMainTabContent>
                {/* <div className='screener-main-tab-content '>
            <ScreenerFeatureTab featureDefs={props.featureDefs!} screenerDefs={props.screenerDefs} variationCodeMap={props.variationCodeMap!} fetch={props.fetchScreenerData}></ScreenerFeatureTab>
        </div> */}
                <ScreenerMainTabContent opened={tabValue === 'selected'}>
                    <ScreenerPanel featureDefs={props.featureDefs!} screenerDefs={props.screenerDefs} variationCodeMap={props.variationCodeMap!} ></ScreenerPanel>
                </ScreenerMainTabContent>

                <ScreenerMainTabContent opened={tabValue === 'table'}>
                    {/* <div>xxx</div> */}
                    <ScreenerTableBox featureDefs={props.featureDefs!} variationCodeMap={props.variationCodeMap!}></ScreenerTableBox>
                </ScreenerMainTabContent>
                {/* <LoadingOveray></LoadingOveray> */}
            </div>
            {/* <Tabs defaultValue="configure">
        <Tabs.List>
            <Tabs.Tab value="configure" size={12} >
            Configure
            </Tabs.Tab>
            <Tabs.Tab value="Params" >
            Params
            </Tabs.Tab>
            <Tabs.Tab value="Table" >
            Table
            </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="configure">
        <ScreenerFeatureTab featureDefs={props.featureDefs!} screenerDefs={props.screenerDefs} variationCodeMap={props.variationCodeMap!} fetch={props.fetchScreenerData}></ScreenerFeatureTab>
        </Tabs.Panel>

        <Tabs.Panel value="Params">
            Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="Table">
            Settings tab content
        </Tabs.Panel>
        </Tabs> */}
        <LoadingOveray></LoadingOveray>
        </div>
    );
}