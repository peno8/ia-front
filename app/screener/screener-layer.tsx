'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import ScreenerTable from './screener-table';
import { useTheme } from 'next-themes';
import ScreenerPanel from './summary/screener-panel';
import ScreenerButtonArea from './screener-button-area';

export default function ScreenerLayer({fetch, children} : 
  { fetch: Function, children: ReactNode }) {
    const { theme, } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(() => true);
    }, [])
  
    if (!mounted) {
      return null;
    }

  return (
    <>
      <div className='flex flex-row h-full'>
        <div className='flex-none w-[500px] p-1 overflow-y-scroll'>
          <ScreenerPanel></ScreenerPanel>
          <ScreenerButtonArea fetch={fetch}></ScreenerButtonArea>
          {children}
        </div>
        <div className='flex-1 p-1 min-w-[500px]'>
          <div className={`${(theme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine") + " w-full h-full"}`}>
            <ScreenerTable></ScreenerTable>
          </div>
        </div>
      </div>
    </>
  )
}
