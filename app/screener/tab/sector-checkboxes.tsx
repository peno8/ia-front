import { useState } from 'react';
import { Checkbox } from '@mantine/core';
import { ScreenerDef } from '@/app/app.store';
import { selectedFeaturesFormStore } from '../screener-store'

function checkbox(value: string, label: string) {
  return <Checkbox className='p-1' value={value} label={label} key={value} />
}


export function SectorCheckboxes({ screenerDefs }: { screenerDefs: ScreenerDef[] }) {
  
  function sectorCheckboxes() {
    screenerDefs.sort((a, b) => a.order - b.order)
    return screenerDefs.map(e => checkbox(e.key, e.desc));
  }

  const checked = selectedFeaturesFormStore((state) => state)

  // const resetExchange = selectedFeaturesFormStore((state) => state.resetExchange)
  // const resetSector = selectedFeaturesFormStore((state) => state.resetSector)
  const resetScreenerKey = selectedFeaturesFormStore((state) => state.resetScreenerKey)

  return (
    <>
      {/* <Checkbox.Group value={checked.exchange? [checked.exchange] : []} onChange={(arr) => resetExchange(arr.slice(-1)[0])}>
        {checkbox('ALL', 'All')}
        {checkbox('NYSE', 'NYSE')}
        {checkbox('Nasdaq', 'Nasdaq')}
      </Checkbox.Group> */}
      <Checkbox.Group value={checked.key? [checked.key] : []} onChange={(arr) => {
        console.log(arr);
        resetScreenerKey(arr.slice(-1)[0]);
        console.log(checked);
        }}>
        {sectorCheckboxes()}
      </Checkbox.Group>
    </>
  );
}

export function CalendarQuarterCheckboxes() {
  const cq = selectedFeaturesFormStore((state) => state.cq)
  const resetCq = selectedFeaturesFormStore((state) => state.resetCq)

  return (
    <>
      <Checkbox.Group value={[cq]} onChange={(arr) => resetCq(arr.slice(-1)[0])}>
        {checkbox('2023-Q2', '2023-Q2')}
        {checkbox('2023-Q1', '2023-Q1')}
      </Checkbox.Group>
    </>
  );
}