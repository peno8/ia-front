'use client'

import { CompanyDef, companyDefStore, saveCompanyDef } from '@/app/app.store';
import { Autocomplete } from '@mantine/core';
import { useEffect } from 'react';

export default function AutoComplete({companyDefs}: {companyDefs: CompanyDef[]}) {
  
  // const companyDefs = companyDefStore((state) => state.data);
  console.log(companyDefs[0])
  // const symbols = companyDefs.map(e => e.sb)
  // // console.log(symbols);
  // const names = new Set(companyDefs.map(e => e.name));
  // console.log(names);
  // console.log([{}])

  // const data = [{ group: 'Ticker', items: symbols }, { group: 'Name', items: names }]
  const data = companyDefs.map(e => ({ value: e.sb, label: `${e.sb} : ${e.name}` }))
  // const data =[
  //   { group: 'Frontend', items: names },
  //   { group: 'Backend', items: ['Express', 'Django'] },
  // ]

  return (
    <Autocomplete
      className='w-[300px]'
      placeholder="Search ticker, AAPL, NVDA..."
      limit={5}
      data={data}
    />
  )
}

