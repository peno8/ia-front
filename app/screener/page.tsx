'use client'

import { GET, ScreenerApiResult } from "./api/route";
import ScreenerTable from "./screener-table"
import { getScreenerParam } from "./api/screener-store"
import FeatureSelector from "./dropdown/feature-selector";
import MarketSelector from "./dropdown/market-selector";
import ScreenerButton from "./dropdown/screener-button";
import { useEffect, useState } from "react";

export default function ScreenerPage() {
  const [tableData, setTableData] = useState<ScreenerApiResult[]>([]);

  useEffect(() => {
    const get = async () => {
      let data = await GET(getScreenerParam());
      // let jsonData = await data.json();
      console.log('page client');
      console.log(data);
      setTableData(data);
    }
    get();
  }, [])
  
  function fetchScreenerData() {
    const get = async () => {
      let data = await GET(getScreenerParam());
      // let jsonData = await data.json();
      console.log('page client');
      console.log(data);
      setTableData(data);
    }
    get();
  }

  return (
    <div>

      <h1 className='text-3xl'>Screener with Sorting</h1>
      <div className='flex flex-row'>
        <div className='p-1 !pl-0'>
          <FeatureSelector ></FeatureSelector>
        </div>
        <div className='p-1'>
          <MarketSelector></MarketSelector>
        </div>
        <div className='p-1'>
          <ScreenerButton action={fetchScreenerData} ></ScreenerButton>
        </div>
      </div>
      <ScreenerTable tableData={tableData}></ScreenerTable>
    </div>
  )
}