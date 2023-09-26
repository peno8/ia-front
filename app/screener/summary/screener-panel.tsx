import { ReactNode, useState } from 'react';
import { FeatureDef, SelectedFeaturesForm, selectedFeaturesFormStore, selectedVariableText } from '../screener-store';
import { Button } from '@mantine/core';
import { NaicsDef } from '@/app/app.store';

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


function sectorDesc(naicsDefs: NaicsDef[], code: string) {
  const def = naicsDefs.find(e => e.code == code);
  return def ? def.desc : "N/A";
}

function Variables({ featureDefs, variationCodeMap }: { featureDefs: FeatureDef[], variationCodeMap: Map<string, string> }) {
  return (
    <>
      {Object.entries(selectedFeaturesFormStore((state) => state.features)).map(e => <div key={e[0]}>{selectedVariableText(featureDefs, variationCodeMap, e[0])}</div>)}
    </>
  )
}

interface SelectedVariablesProps { featureDefs: FeatureDef[], fetch: Function, naicsDefs: NaicsDef[], variationCodeMap: Map<string, string> }

function sectorCodeToDesc(naicsDefs: NaicsDef[]) {
  return (code: string) => naicsDefs.find(e => e.code == code)?.desc;
}

function CallButton(fetch: Function) {
  const [disabled, setDisabled] = useState(false);


  const valueChanged = selectedFeaturesFormStore((state) =>  state.valueChanged);
  const setValueChanged = selectedFeaturesFormStore((state) =>  state.setValueChanged);

  function call() {
    setValueChanged();
    fetch();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000)
  }

  return(
    <Button variant='filled' onClick={() => call()} disabled={disabled || !valueChanged}>Run</Button>
  )
}

function ResetButton() {
  const reset = selectedFeaturesFormStore((state) =>  state.resetAll);
  return(
    <Button variant='filled' color="orange" onClick={() => reset()}>Reset</Button>
  )
}

export default function ScreenerPanel({ featureDefs, fetch, naicsDefs, variationCodeMap }: SelectedVariablesProps) {

  console.log('SelectedVariables');

  return (
    <div className='flex flex-row justify-between m-2 h-[160px]'>
      <div className="flex flex-col text-sm">
        
        <SummaryRow2 name={'cq'} label={'Calendar Quarter'}></SummaryRow2>
        
        <SummaryRow2 name={'exchange'} label={'Exchange'}></SummaryRow2>
        
        <SummaryRow2 name={'naics'} label={'Sector'} valueFunc={sectorCodeToDesc(naicsDefs)}></SummaryRow2>
        <SummaryRow label={'Variables'}>
          <div>
            <Variables featureDefs={featureDefs} variationCodeMap={variationCodeMap}></Variables>
          </div>
        </SummaryRow>
      </div>
      <div className='align-right'>
        {CallButton(fetch)}
        
      </div>
      <div>
        {ResetButton()}
      </div>
    </div>
  )
}