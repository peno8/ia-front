'use client'

import { CompanyDef, setCompanyDefs } from "@/app/app.store";
import { Autocomplete } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AutoCompleteComp({companyDefs}: {companyDefs: CompanyDef[]}) {
  const router = useRouter()
  const [acValue, setAcValue] = useState("")
  const data = companyDefs.map(e => ({ value: e.sb, label: `${e.sb} : ${e.name}` }))

  return (
    <Autocomplete
      className='w-[300px] autocomplete'
      placeholder="Search ticker"
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

export default function AutocompleteSearch({companyDefStr}: {companyDefStr: string}) {
    const defs: CompanyDef[] = JSON.parse(companyDefStr);
    setCompanyDefs(companyDefStr);
    return (
      <>
        <AutoCompleteComp companyDefs={defs}></AutoCompleteComp>
      </>
    );
  }