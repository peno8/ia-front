'use client'

import React, { useState, useRef, useEffect, useCallback, Children, ReactNode } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { POST, ScreenerApiResult } from './api/route';
import { FeatureDef } from './screener-store';
import CornerDialog from '../component/util/dialog';
import ScreenerTable from './screener-table';
import { useTheme } from 'next-themes';
import ScreenerPanel from './summary/screener-panel';
import ScreenerButtonArea from './screener-button-area';
import { ScreenerDef } from '../app.store';


export default function ScreenerLayer({fetch, children} : 
  { fetch: Function, children: ReactNode }) {
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
      <div className='flex flex-row h-full'>
        <div className='flex-none w-[500px] p-1 overflow-y-scroll'>
          <ScreenerPanel></ScreenerPanel>
          <ScreenerButtonArea fetch={fetch}></ScreenerButtonArea>
          {children}
        </div>
        
        <div className='flex-1 p-1 min-w-[500px]'>
          {theme === 'dark' ? <div className="ag-theme-alpine-dark w-full h-full">
          <ScreenerTable></ScreenerTable>
          </div> :         <div className="ag-theme-alpine w-full h-full">
          <ScreenerTable></ScreenerTable>
          </div>}

          
        </div>
      </div>
    </>
  )
}
