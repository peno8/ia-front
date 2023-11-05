import ScreenerFeatureTab from './tab/screener-feature-tab';
import { ReactNode, useState } from 'react';
import ScreenerButtonArea from './screener-button-area';
import ScreenerTableBox from './screener-table-box';
import ScreenerPanel from './summary/screener-panel';
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
            <button className='screener-main-tab-button-item selected ia-hover' key={value} onClick={() => onClick(() => value)}>{label}</button> :
            <button className='screener-main-tab-button-item ia-hover' key={value} onClick={() => onClick(() => value)}>{label}</button>
    )
}

export interface ScreenerMainTabProps {
    fetch: Function
}

export default function ScreenerMainTab(props: ScreenerMainTabProps) {
    const [tabValue, setTabValue] = useState('result');
    const tabValues = ['settings', 'params', 'result'];

    function fetchFromMobileTab() {
        setTabValue(() => 'result');
        props.fetch();
    }

    return (
        <div className='relative screener-main-tab'>
            <div className='screener-main-tab-buttons'>
                {tabValues.map(v => TabButton(v, tabValue === v, setTabValue))}
            </div>
            <div className='screener-main-tab-contents-area'>
                <ScreenerMainTabContent opened={tabValue === 'settings'}>
                    <ScreenerButtonArea fetch={fetchFromMobileTab} />
                    <ScreenerFeatureTab />
                </ScreenerMainTabContent>
                <ScreenerMainTabContent opened={tabValue === 'params'}>
                    <ScreenerPanel />
                </ScreenerMainTabContent>

                <ScreenerMainTabContent opened={tabValue === 'result'}>
                    <ScreenerTableBox />
                </ScreenerMainTabContent>
            </div>
            <LoadingOveray />
        </div>
    );
}