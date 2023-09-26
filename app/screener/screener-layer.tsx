'use client'

import React, { useState, useRef, useEffect, useCallback, Children, ReactNode } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { POST, ScreenerApiResult } from './api/route';
import { FeatureDef, selectedFeaturesFormStore, selectedVariableText, SelectedFeaturesForm, toggleDialog, fetchScreenerData, tableDataStore } from './screener-store';
import CornerDialog from '../component/util/dialog';
import ScreenerTable from './screener-table';


export default function ScreenerLayer({featureDefs, variationCodeMap, children} : 
  {  featureDefs: FeatureDef[], variationCodeMap: Map<string, string>, children: ReactNode}) {

  // const store = tableDataStore((state) => state);

  // function getSelectedScreenerParam(): string {
  //   const from = selectedFeaturesFormStore.getState();
  //   console.log(from);
  //   const to = JSON.parse(JSON.stringify(from));
  //   console.log(to);
  //   const entries: [string, { lowerIsBetter: boolean }][] = Object.entries(to.features);
  //   const updatedFeatureObj = entries.map((e) => ({ feature: e[0], lowerIsBetter: e[1].lowerIsBetter}))
  //   to.features = updatedFeatureObj;
    
  //   console.log(to);
  //   // return JSON.stringify(to);
  //   return to;
  // }

  // function getRequest(jsonStr: string) {    
  //   return new Request('http://127.0.0.1:8080/api/percentile/ranks',
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: jsonStr,
  //       method: 'POST',
  //       cache: 'no-store'
        
  //     }
  //   )
  // }
  // useEffect(() => {
  //   const get = async () => {
  //     const paramObj = getSelectedScreenerParam();
  //     let data = await POST(getRequest(JSON.stringify(paramObj)));
      
  //     console.log('page client');
  //     console.log(data);
      
  //     tableDataStore.setState({ response: data, reqObj: paramObj });
      
  // }
  // get();
  // }, [])

  return (
    <>
    <div className="flex flex-col grow">
      <div className='flex flex-row grow '>
        <div className='flex-none w-[500px] p-1 overflow-y-scroll'>
          {children}
        </div>
        <div className='flex-1 p-1'>
        {/* <ScreenerLayer ref={layerRef} featureDefs={featureDefs} variationCodeMap={variationCodeMap} callScreeenerApi={callScreeenerApi}> */}
          <ScreenerTable  featureDefs={featureDefs} variationCodeMap={variationCodeMap}>
            </ScreenerTable>
          {/* </ScreenerLayer> */}
        </div>
      </div>
    </div>
    </>
  )
}
