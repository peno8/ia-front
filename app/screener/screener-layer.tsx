'use client'

import React, { useState, useRef, useEffect, useCallback, Children, ReactNode } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { POST, ScreenerApiResult } from './api/route';
import { FeatureDef, selectedFeaturesFormStore, getVariationLabel, SelectedFeaturesForm, toggleDialog, fetchScreenerData, tableDataStore } from './screener-store';
import CornerDialog from '../component/util/dialog';
import ScreenerTable from './screener-table';
import { useTheme } from 'next-themes';


export default function ScreenerLayer({featureDefs, variationCodeMap, children} : 
  { featureDefs: FeatureDef[], variationCodeMap: Map<string, string>, children: ReactNode }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true);
    }, [])
  
    if (!mounted) {
      return null;
    }

  return (
    <>
    {/* <div className="flex flex-col grow"> */}
      <div className='flex flex-trow grow h-full'>
        <div className='flex-none w-[500px] p-1 overflow-y-scroll'>
          {children}
        </div>
        <div className='flex-1 p-1 '>
          {theme === 'dark' ? <div className="ag-theme-alpine-dark w-full h-full">
          <ScreenerTable  featureDefs={featureDefs} variationCodeMap={variationCodeMap}></ScreenerTable>
          </div> :         <div className="ag-theme-alpine w-full h-full">
          <ScreenerTable  featureDefs={featureDefs} variationCodeMap={variationCodeMap}></ScreenerTable>
          </div>}
        {/* <div className="ag-theme-alpine dark:ag-theme-alpine-dark dark:text-red-700 w-full h-full">
          <ScreenerTable  featureDefs={featureDefs} variationCodeMap={variationCodeMap}></ScreenerTable>
          </div> */}
          
        </div>
      </div>
    {/* </div> */}
    </>
  )
}
