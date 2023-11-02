'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { FeatureDef } from './screener-store';
import ScreenerTable from './screener-table';
import { useTheme } from 'next-themes';


export default function ScreenerTableBox() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <>
             <div className={`${theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}  w-full h-full`}>
                <ScreenerTable></ScreenerTable>
            </div>
        </>
    )
}
