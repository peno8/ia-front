'use client'

import { CompanyDef, setCompanyDefs } from "@/app/app.store";
import AutoComplete from "./autocomplete";
import { useEffect } from "react";

export default function AutocompleteSearch({companyDefStr}: {companyDefStr: string}) {
    const defs: CompanyDef[] = JSON.parse(companyDefStr);
    setCompanyDefs(companyDefStr);
    return (
      <>
        <AutoComplete companyDefs={defs}></AutoComplete>
      </>
    );
  }