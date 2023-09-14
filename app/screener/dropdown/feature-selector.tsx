'use client'

import { ChangeEvent, useState } from 'react'
import { Combobox, useCombobox, Switch, Button } from '@mantine/core';
import { screenerParamStore } from '../api/screener-store'
import { produce } from 'immer';

function updateParamStore(label: string, event: ChangeEvent) {
  const params = screenerParamStore.getState().param;
  const updatedParams = produce(params, draft => {
    const from = draft.features[label];
    draft.features[label] = !from;
    draft
  })
  
  screenerParamStore.setState({param: updatedParams});
  console.log(screenerParamStore.getState().param.features);
}

export default function FeatureSelector() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const store = screenerParamStore((state) => state.param)

  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      position='bottom-start'
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <Button className='!w-[200px]' onClick={() => combobox.toggleDropdown()} variant="default">Sorting Criteria</Button>
      </Combobox.Target>

      <Combobox.Dropdown className='!w-[300px]'>
        <Combobox.Options>
          <Combobox.Group label="Profitability">
            <div className='p-1'>
              <Switch
                label='CA|A'
                checked={store.features['CA|A']}
                onChange={(event) => updateParamStore('CA|A', event)}
              />
            </div>
            <div className='p-1'>
              <Switch
                label='OI_T|E'
                checked={screenerParamStore.getState().param.features['OI_T|E']}
              />
            </div>
          </Combobox.Group>

          <Combobox.Group label="Stability">
            <div className='p-1'>
              <Switch
                label="NI_T|R_T"
                checked={screenerParamStore.getState().param.features['NI_T|R_T']}
              />
            </div>
            <div className='p-1'>
              <Switch
                label="I agree to sell my privacy"
              />
            </div>
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}