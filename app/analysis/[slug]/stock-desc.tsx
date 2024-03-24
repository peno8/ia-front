import { CompanyDef } from "@/app/app.store";
import { Divider, Input, TextInput } from "@mantine/core";
import { FeatureData } from "../api/route";
import { useState } from "react";

const typeCheck = require('type-check').typeCheck;

const TextItem = ({ label, value, width, grow}: { label: string, value: string, width?: number, grow?: boolean}) =>
<div className={`flex flex-row items-center ${grow? 'grow' : ''}`}>
    <Input.Label className='w-32'>{label}</Input.Label>
    <Input.Label className={width ? `!w-${width} ${grow? 'grow' : ''}` : 'w-32'}>{value}</Input.Label>
</div>

const getMultiple = (num: number, denom: string) => (parseFloat(denom) / (num! / 1000)).toFixed(1)

function MultipleCalculator({featureData} : {featureData: FeatureData}) {
    const revenues = featureData.feature.features.find(e => e.fName === 'R_T')?.features[0].value;
    const netIncome = featureData.feature.features.find(e => e.fName === 'NI_T')?.features[0].value;

    const [mc, setMc] = useState("");

    function changeMc(value: string) {
        setMc(() => value);
    }

    return(
        <div>
            <Divider my="sm" label="Multiple Calculator" labelPosition="left" className="!dark:!text-[--text-dark]" />
            <div className="flex flex-row gap-x-5 items-end">
                <TextInput label={'Marketcap'} placeholder={'In Billion dollars'} className="w-40 mr-10" value={mc} onChange={e => changeMc(e.currentTarget.value)}/> 
                <div className="flex flex-col">
                    <div className="mb-3">
                    <Input.Label className='w-60'>{'Marketcap / NetIncome(TTM)'}</Input.Label>
                    <Input.Label className={'w-32'}>{typeCheck('Number', netIncome) && mc ? getMultiple(netIncome!, mc) : 0}</Input.Label>
                    </div>
                    <div>
                    <Input.Label className='w-60'>{'Marketcap / Revenues(TTM)'}</Input.Label>
                    <Input.Label className={'w-32'}>{typeCheck('Number', revenues) && mc ? getMultiple(revenues!, mc) : 0}</Input.Label>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default function StockDescription({ cd, featureData }: { cd: CompanyDef, featureData: FeatureData }) {
    return (
        <div className="p-6 border-b-[1px]">
            <div className="mt-2 flex flex-row gap-x-8 items-end">
                <div className="text-2xl">{`${cd.name}`}</div>
                <a href={`https://www.google.com/search?q=${cd.name.replace(' ', '+')}`} target="_blank" className="text-blue-600 visited:text-purple-600">
                    Search
                </a>
                <a href={`https://www.sec.gov/edgar/browse/?CIK=${cd.cik}`} target="_blank" className="text-blue-600 visited:text-purple-600">
                    EDGAR
                </a>
                <a href={`https://www.tradingview.com/chart/?symbol=${cd.exg}:${cd.sb.includes('-') ? cd.sb.replace('-', '.') : cd.sb}`} target="_blank" className="text-blue-600 visited:text-purple-600">
                    Chart
                </a>
                
            </div>
            {/* <div className="text-2xl">{`${cd.name}`}</div> */}
            <div className="mt-2 flex flex-row gap-x-8">
                <TextItem label='Symbol' value={cd.sb} />
                <TextItem label='CIK' value={cd.cik} />
            </div>
            <div className="mt-2 flex flex-row gap-x-8">
                <TextItem label='Exchange' value={cd.exg} />
                <TextItem label='Business' value={cd.desc} width={96} grow/>
            </div>
            {/* <MultipleCalculator featureData={featureData}/> */}
        </div>
    )
}