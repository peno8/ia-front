import { Checkbox } from '@mantine/core';
import { selectedFeaturesFormStore } from '../screener-store'
import { useContext } from 'react';
import { ScreenerContext } from '../screener-context';

function SortCheckbox(value: string, label: string) {
  return <Checkbox className='p-1' value={value} label={label} key={value} />
}


export function SectorCheckboxes() {
  const context = useContext(ScreenerContext);
  
  // function sectorCheckboxes() {
  //   context.screenerDefs.sort((a, b) => a.order - b.order);
  //   return context.screenerDefs.map(e => SortCheckbox(e.key, e.desc));
  // }

  const checked = selectedFeaturesFormStore((state) => state)

  const resetScreenerKey = selectedFeaturesFormStore((state) => state.resetScreenerKey)

  return (
    <>
      <Checkbox.Group value={checked.key? [checked.key] : []} onChange={(arr) => {
        resetScreenerKey(arr.slice(-1)[0]);
        }}>
        {context.screenerDefs.map(e => SortCheckbox(e.key, e.desc))}
      </Checkbox.Group>
    </>
  );
}

export function CalendarQuarterCheckboxes() {
  const cq = selectedFeaturesFormStore((state) => state.cq)
  const resetCq = selectedFeaturesFormStore((state) => state.resetCq)
  const context = useContext(ScreenerContext);

  return (
    <>
      <Checkbox.Group value={[cq]} onChange={(arr) => resetCq(arr.slice(-1)[0])}>
        {SortCheckbox(context.metadata.CURRENT_QT, context.metadata.CURRENT_QT)}
        {SortCheckbox(context.metadata.LAST_QT, context.metadata.LAST_QT)}
      </Checkbox.Group>
    </>
  );
}