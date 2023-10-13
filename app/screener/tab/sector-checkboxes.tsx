import { useState } from 'react';
import { Checkbox } from '@mantine/core';
import { ScreenerDef } from '@/app/app.store';
import { selectedFeaturesFormStore } from '../screener-store'

function SortCheckbox(value: string, label: string) {
  return <Checkbox className='p-1' value={value} label={label} key={value} />
}


export function SectorCheckboxes({ screenerDefs }: { screenerDefs: ScreenerDef[] }) {
  
  function sectorCheckboxes() {
    screenerDefs.sort((a, b) => a.order - b.order);
    return screenerDefs.map(e => SortCheckbox(e.key, e.desc));
  }

  const checked = selectedFeaturesFormStore((state) => state)

  const resetScreenerKey = selectedFeaturesFormStore((state) => state.resetScreenerKey)

  return (
    <>
      <Checkbox.Group value={checked.key? [checked.key] : []} onChange={(arr) => {
        resetScreenerKey(arr.slice(-1)[0]);
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
        {SortCheckbox('2023-Q2', '2023-Q2')}
        {/* {checkbox('2023-Q1', '2023-Q1')} */}
      </Checkbox.Group>
    </>
  );
}