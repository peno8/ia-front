'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { FeatureDef } from './screener-store';
import ScreenerTable from './screener-table';
import { useTheme } from 'next-themes';


export default function ScreenerTableBox({ featureDefs, variationCodeMap }:
    { featureDefs: FeatureDef[], variationCodeMap: Map<string, string> }) {
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
            {theme === 'dark' ? 
            <div className="ag-theme-alpine-dark w-full h-full">
                <ScreenerTable featureDefs={featureDefs} variationCodeMap={variationCodeMap}></ScreenerTable>
            </div> : 
            <div className="ag-theme-alpine min-w-[600px] h-full">
                <ScreenerTable featureDefs={featureDefs} variationCodeMap={variationCodeMap}></ScreenerTable>
            </div>}

        </>
    )
}
