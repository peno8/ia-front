'use client'

import { CompanyDef, companyDefList } from '@/app/app.store';
import { Autocomplete } from '@mantine/core';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function AutoComplete({companyDefs}: {companyDefs: CompanyDef[]}) {
  const router = useRouter()
  const [acValue, setAcValue] = useState("")
  const data = companyDefs.map(e => ({ value: e.sb, label: `${e.sb} : ${e.name}` }))

  return (
    <Autocomplete
      className='w-[300px]'
      placeholder="Search ticker, AAPL, NVDA..."
      limit={5}
      data={data}
      value={acValue}
      onChange={v => {
        setAcValue(v);
      }}
      selectFirstOptionOnChange
      onOptionSubmit={v => {
        router.push(`/analysis/${v}`)
      }}
    />
  )
}

