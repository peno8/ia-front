'use client'

import { CompanyDef, saveCompanyDef } from "@/app/app.store";
import AutoComplete from "./autocomplete";
import { useEffect } from "react";

export default function AutocompleteSearch({companyDefStr}: {companyDefStr: string}) {
    // console.log(companyDefStr)

    // useEffect(() => {
    //     saveCompanyDef(companyDefStr);
    // }, [])
    const json: CompanyDef[] = JSON.parse(companyDefStr);
  
    // const json: CompanyDef[] = JSON.parse(companyDefStr);
    // companyDefStore.setState(json);
    
    
    // console.log(json)
    
    
    // console.log(companyDefs)
  
    // const data = [
    //   { group: 'Used to be a pickle', items: ['Rick'] },
    //   { group: 'Never was a pickle', items: ['Morty', 'Beth'] }
    // ]
  
    return (
      <>
        <AutoComplete companyDefs={json}></AutoComplete>
      </>
    );
  }