import { Checkbox, Switch } from '@mantine/core';
import { Chip, rem } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { screenerFieldsFormStore, selectedFeaturesFormStore, toggleDialog } from '../screener-store';
import { sys } from 'typescript';
import { maxScreenerVariableNum } from '@/app/utils';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';


function DirectionChip(props: { code: string }) {

  // @ts-ignore
  const fieldsStore = selectedFeaturesFormStore((state) => state.features[props.code])
  const resetLessIsBetter = selectedFeaturesFormStore((state) => state.resetLessIsBetter)
  
  return (
    // fieldsStore ? !fieldsStore.lowerIsBetter ?
    // <Chip defaultChecked checked={true} size={'xs'} radius="xs" onClick={() => { resetLessIsBetter(props.code) }} variant='outline'
    //   icon={<IconArrowUp style={{ width: rem(16), height: rem(16) }} className='text-blue-500' />}>
    //   Ascending
    // </Chip> :
    // <Chip color="red" checked={true} defaultChecked size={'xs'} radius="xs" onClick={() => { resetLessIsBetter(props.code) }} variant='outline'
    //   icon={<IconArrowDown style={{ width: rem(16), height: rem(16) }} className='text-red-500' />}>
    //   Descending
    // </Chip> : null
    fieldsStore ? <Switch color="gray" checked={fieldsStore.lowerIsBetter } defaultChecked size={'xs'} radius="xs" onClick={() => { resetLessIsBetter(props.code) }} variant='outline'
    offLabel={<IconArrowDown style={{ width: rem(16), height: rem(16) }} className='text-gray-500' />}
    onLabel={<IconArrowUp style={{ width: rem(16), height: rem(16) }} className='text-white-500' />} />
    : null
    );
}



function ScreenerSwitch(props: { code: string, label: string }) {
  // @ts-ignore
  const isTriggered = selectedFeaturesFormStore((state) => state.features[props.code]);
  const addOrRemoveByFeature = selectedFeaturesFormStore((state) => state.addOrRemoveByFeature);

  function toggleSwitch() {
    addOrRemoveByFeature(props.code);
  }

  return (
    // <Switch
    //   size="sm" onLabel="On" offLabel="OFF" radius="xs" checked={isTriggered ? 'lowerIsBetter' in isTriggered : false}
    //   onChange={() => toggleSwitch()}
    // />
    <Checkbox
    styles={{
      label: { fontSize: '0.75rem' }
    }}
    color='gray'
    size="xs" radius="xs" label={props.label} checked={isTriggered ? 'lowerIsBetter' in isTriggered : false}
    onChange={() => toggleSwitch()}
  />
  );
}

interface ScreenerOptionProp {
  name: string;
  code: string;
}

export default function ScreenerOption(props: ScreenerOptionProp) {

  return (
    <div className='screener-variation-panel flex flex-row items-center hover:bg-slate-100 dark:hover:bg-[--bg-dark-hover] text-sm p-0.5' key={props.name}>

      {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down-left" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8v8h8"></path>
      </svg> */}
      {/* <div className='w-24 italic'>
        
      </div> */}
      <div className='screener-switch'>
        <ScreenerSwitch code={props.code} label={props.name}></ScreenerSwitch>
      </div>
      <div className='pl-2 pr-1'>
        <DirectionChip code={props.code}></DirectionChip>
      </div>
    </div>
  )
}