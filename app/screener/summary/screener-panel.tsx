import { ReactNode, useState } from 'react';
import { FeatureDef, SelectedFeaturesForm, selectedFeaturesFormStore, getVariationLabel, tableDataStore } from '../screener-store';
import { Button, List } from '@mantine/core';
import { ScreenerDef, fetchStatusStore } from '@/app/app.store';

function LabelColumn(text: string) {
  return <div className='text-sm font-semibold w-32'>{text}: </div>;
}

function SummaryRow({ label, children }: { label: string, children: React.ReactNode }) {
  return <div className="flex flex-row">
    {LabelColumn(label)}
    {children}
  </div>
}

function SummaryRow2({ name, label, valueFunc }: { name: string, label: string, valueFunc?: Function }) {
  const value = selectedFeaturesFormStore((state) => state[name])

  return <div className="flex flex-row">
    {LabelColumn(label)}
    <div>
      {value ? valueFunc ? valueFunc(value) : value : 'None'}
    </div>
  </div>
}

function Variables({ featureDefs, variationCodeMap }: { featureDefs: FeatureDef[], variationCodeMap: Map<string, string> }) {
  return (
    <>
      {Object.entries(selectedFeaturesFormStore((state) => state.features)).map(e => 
      <li key={e[0]}>{getVariationLabel(e[0])}</li>
      // <List.Item key={e[0]}>{getVariationLabel(e[0])}</List.Item>
      )}
    </>
  )
}

interface SelectedVariablesProps { featureDefs: FeatureDef[], 
  // fetch: Function, 
  screenerDefs: ScreenerDef[], 
  variationCodeMap: Map<string, string> }

function sectorCodeToDesc(screenerDefs: ScreenerDef[]) {
  
  return (code: string) => {
    const desc = screenerDefs.find(e => e.key == code)?.desc
    return desc? desc : 'ALL';
  };
}

function CallButton(fetch: Function) {
  const [disabled, setDisabled] = useState(false);
  const removeResponse = tableDataStore((state) => state.removeResponse);
  const setLoading = fetchStatusStore((state) => state.setLoading);


  const valueChanged = selectedFeaturesFormStore((state) =>  state.valueChanged);
  const setValueChanged = selectedFeaturesFormStore((state) =>  state.setValueChanged);

  function call() {
    removeResponse();
    setValueChanged();
    setLoading();
    fetch();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000)
  }
//
  return(
    <Button className='call-button-color' variant='filled' onClick={() => call()} disabled={disabled || !valueChanged}>Run</Button>
  )
}

function ResetButton() {
  const reset = selectedFeaturesFormStore((state) =>  state.resetAll);
  return(
    <Button className='reset-button-color' color="orange" onClick={() => reset()}>Reset</Button>
  )
}

export default function ScreenerPanel({ featureDefs, screenerDefs, variationCodeMap }: SelectedVariablesProps) {

  return (
    <div className='flex flex-row justify-between p-2 h-52'>
      <div className="flex flex-col text-sm">
        
        <SummaryRow2 name={'cq'} label={'Calendar Quarter'}></SummaryRow2>
        
        <SummaryRow2 name={'key'} label={'Exchange'} valueFunc={sectorCodeToDesc(screenerDefs.filter(e => e.keyType !== 'SIC'))}></SummaryRow2>
        
        <SummaryRow2 name={'key'} label={'Industry'} valueFunc={sectorCodeToDesc(screenerDefs.filter(e => e.keyType === 'SIC'))}></SummaryRow2>
        <SummaryRow label={'Variables'}>

        </SummaryRow>
        <ul className='list-disc pl-5'>
            <Variables featureDefs={featureDefs} variationCodeMap={variationCodeMap}></Variables>
          </ul>
      </div>
      {/* <div className='flex flex-row'>
        <div className='align-right pr-2'>
          {CallButton(fetch)}
          
        </div>
        <div className='align-right'>
          {ResetButton()}
        </div>
      
      </div> */}
    </div>
  )
}