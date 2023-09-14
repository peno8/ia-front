'use client'

import { useState } from 'react'
import { Combobox, useCombobox, Switch, Button } from '@mantine/core';

export default function MarketSelector() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

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
        <Button className='!w-[150px]' onClick={() => combobox.toggleDropdown()} variant="default">Market</Button>
      </Combobox.Target>

      <Combobox.Dropdown className='!w-[300px]'>
        <Combobox.Options>

          <div className='p-1'>
            <Switch
              label="NYSQ"
            />
          </div>
          <div className='p-1'>
            <Switch
              label="NASDAQ"
            />
          </div>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}