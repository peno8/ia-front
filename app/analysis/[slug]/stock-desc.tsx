import { CompanyDef } from "@/app/app.store";
import { Divider, Input, TextInput } from "@mantine/core";
import { FeatureData } from "../api/route";
import { useState } from "react";

const item = (label: string, value: string) =>
    <div className="flex flex-row text-lg">
        <div className="mr-3">{label}</div>
        <div>{value}</div>
    </div>

// const textItem = (label: string, value: string, width?: number) =>
//     <div className="flex flex-row items-center">
//         <Input.Label className='w-32'>{label}</Input.Label>
//         <TextInput
//             variant="unstyled"
//             className={width ? `!w-${width} grow` : 'w-32'}
//             value={value}
//         />
//     </div>

const textItem = (label: string, value: string, width?: number, grow?: boolean) =>
<div className={`flex flex-row items-center ${grow? 'grow' : ''}`}>
    <Input.Label className='w-32'>{label}</Input.Label>
    <Input.Label className={width ? `!w-${width} ${grow? 'grow' : ''}` : 'w-32'}>{value}</Input.Label>
    {/* <TextInput
        variant="unstyled"
        className={width ? `!w-${width} ${grow? 'grow' : ''}` : 'w-32'}
        value={value}
    /> */}
</div>

function MultipleCalculator({featureData} : {featureData: FeatureData}) {
    const revenues = featureData.feature.features.find(e => e.key === 'R_T')?.features[0].value;
    const netIncome = featureData.feature.features.find(e => e.key === 'NI_T')?.features[0].value;

    const [mc, setMc] = useState("");

    function changeMc(value: string) {
        setMc(value);
    }

    return(
        <div>
            <Divider my="sm" label="Multiple Calculator" labelPosition="left" className="!dark:!text-[--text-dark]" />
            <div className="flex flex-row gap-x-5 items-end">
                <TextInput label={'Marketcap'} placeholder={'In Billion dollars'} className="w-40 mr-10" value={mc} onChange={e => changeMc(e.currentTarget.value)}/> 
                <div className="flex flex-col">
                    <div className="mb-3">
                    <Input.Label className='w-60'>{'Marketcap / NetIncome(TTM)'}</Input.Label>
                    <Input.Label className={'w-32'}>{netIncome && mc ? (parseFloat(mc) / (netIncome! / 1000)).toFixed(1) : 0}</Input.Label>
                    </div>
                    <div>
                    <Input.Label className='w-60'>{'Marketcap / Revenues(TTM)'}</Input.Label>
                    <Input.Label className={'w-32'}>{revenues && mc ? (parseFloat(mc) / (revenues! / 1000)).toFixed(1) : 0}</Input.Label>
                    </div>
                </div>
                {/* <TextInput label={'Marketcap / NetIncome(TTM)'} value={netIncome && mc ? (parseFloat(mc) / (netIncome! / 1000)).toFixed(1) : 0} className="w40" disabled/>    
                <TextInput label={'Marketcap / Revenues(TTM)'} value={revenues && mc ? (parseFloat(mc) / (revenues! / 1000)).toFixed(1) : 0} className="w-44" />     */}
                
            </div>
            
        </div>
        
    )
}

export default function StockDescription({ cd, featureData }: { cd: CompanyDef, featureData: FeatureData }) {
    return (
        <div className="p-6 border-b-[1px]">
            <div className="text-2xl">{`${cd.name}`}</div>

            <div className="mt-2 flex flex-row gap-x-8">
                {textItem('Symbol', cd.sb)}
                {textItem('CIK', cd.cik)}
            </div>
            <div className="mt-2 flex flex-row gap-x-8">
                {textItem('Exchange', cd.exg)}
                {textItem('Business', cd.desc, 96, true)}
                {/* <Input.Label className='w-32'>{'Exchange'}</Input.Label>
        <TextInput
            variant="unstyled"
            className='w-96'
            value={cd.desc}
        /> */}
            </div>
            <MultipleCalculator featureData={featureData}/>
        </div>
    )
}