import { Switch } from '@mantine/core';
import { Chip, rem } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { screenerFieldsFormStore, selectedFeaturesFormStore, toggleDialog } from '../screener-store';
import { sys } from 'typescript';
import { maxScreenerVariableNum } from '@/app/utils';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';


function DirectionChip(props: { code: string }) {

  const fieldsStore = selectedFeaturesFormStore((state) => state.features[props.code])
  const resetLessIsBetter = selectedFeaturesFormStore((state) => state.resetLessIsBetter)


  return (fieldsStore ? fieldsStore.lowerIsBetter ? <Chip checked={true} size={'xs'} radius="xs" onClick={() => { resetLessIsBetter(props.code) }}
    icon={<IconArrowUp style={{ width: rem(16), height: rem(16) }} className='text-blue-500' />}
  >Ascending</Chip> :
    <Chip color="red" checked={true} defaultChecked size={'xs'} radius="xs" onClick={() => { resetLessIsBetter(props.code) }}

      icon={<IconArrowDown style={{ width: rem(16), height: rem(16) }} className='text-red-500' />}
    >Descending</Chip> : <div></div>);
}



function ScreenerSwitch(props: { code: string }) {

  const isTriggered = selectedFeaturesFormStore((state) => state.features[props.code])
  const addOrRemoveByFeature = selectedFeaturesFormStore((state) => state.addOrRemoveByFeature)
  // const count = selectedFeaturesFormStore((state) => state.count)
  // const reachedMax = selectedFeaturesFormStore((state) => state.reachedMax)
  // const openDialog = toggleDialog((state) => state.openDialog)

  console.log('ScreenerSwitch!!');

  function toggleSwitch() {
    addOrRemoveByFeature(props.code);
    // if(!reachedMax || isTriggered) {
    //   addOrRemoveByFeature(props.code);
    // } else {
    //   // openDialog();
    //   addOrRemoveByFeature(props.code);
    // }
  }

  return (
    <Switch
      size="sm" onLabel="On" offLabel="OFF" radius="xs" checked={isTriggered ? 'lowerIsBetter' in isTriggered : false}
      onChange={() => toggleSwitch()}
    />
  );
}

interface ScreenerOptionProp {
  name: string;
  code: string;
}

export default function ScreenerOption(props: ScreenerOptionProp) {
  // console.log('ScreenerOption')
  return (
    <div className='flex flex-row ml-4 items-center hover:bg-slate-100 text-sm p-0.5' key={props.name}>

      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down-left" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8v8h8"></path>
      </svg>
      <div className='w-24 italic'>
        {props.name}
      </div>
      <div className='pl-2'>
        <ScreenerSwitch code={props.code}></ScreenerSwitch>
      </div>
      <div className='pl-2 '>
        <DirectionChip code={props.code}></DirectionChip>
      </div>
    </div>
  )
}