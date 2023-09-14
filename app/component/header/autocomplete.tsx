'use client'

import { Autocomplete } from '@mantine/core';

export default function AutocompleteSearch() {

  const data = [
    { group: 'Used to be a pickle', items: ['Rick'] },
    { group: 'Never was a pickle', items: ['Morty', 'Beth'] }
  ]

  return (
    <Autocomplete
      className='w-[300px]'
      placeholder="Search ticker, AAPL, NVDA..."
      data={data}
    />
  );
}