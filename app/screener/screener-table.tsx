'use client'

import React, { useState, useRef, useEffect, useCallback, Children } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { POST, ScreenerApiResult } from './api/route';
import { FeatureDef, selectedFeaturesFormStore, selectedVariableText, SelectedFeaturesForm, toggleDialog, tableDataStore, fetchScreenerData } from './screener-store';
import CornerDialog from '../component/util/dialog';

interface ScreenerTableProp {
  // tableData: ScreenerApiResult[]
  featureDefs: FeatureDef[]
  variationCodeMap: Map<string, string>
}

function getColDefs(featureDefs: FeatureDef[], variationCodeMap: Map<string, string>, requestObj: SelectedFeaturesForm) {
  

  if (!requestObj) {
    return [];
  }

  const defaultColumnDefs = [
    
    {
      field: 'symbol',
      valueGetter: (params: any) => params.data.percentile.symbol,
      headerTooltip: 'Symbol'
    },
    {
      field: 'cq',
      valueGetter: (params: any) => params.data.percentile.cq,
      headerTooltip: 'Quarter by calandar'
    }]

  const valueColDefs = requestObj.features.flatMap((e: { feature: string, lowerIsBetter: boolean }) => {
    
    const name = selectedVariableText(featureDefs, variationCodeMap, e.feature);
    return [{
      field: name,
      valueGetter: (params: any) => {
        return params.data.percentile.percentiles[e.feature] ? params.data.percentile.percentiles[e.feature]['v'] : 0;
      },
      headerTooltip: name
    }, {
      field: 'Percentile',
      valueGetter: (params: any) => {
        const obj = params.data.percentile.percentiles[e.feature]
        return obj ? e.lowerIsBetter ? obj['p'] : 1 - obj['p'] : undefined;
      },
      headerTooltip: 'Percentile',
    }]
  })

  const scoreColDef = [{
    field: 'Score',
    valueGetter: (params: any) => params.data.score,
    headerTooltip: 'Overall Percentile'
  }]

  const allColDefs = defaultColumnDefs.concat(valueColDefs, scoreColDef)
  return allColDefs;
}

export default function ScreenerTable(props: ScreenerTableProp) {

  const gridRef = useRef(null);
  const store = tableDataStore((state) => state);
  const onFirstDataRendered = useCallback(() => {
    // @ts-ignore
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  console.log(store);

  return (
    <>
      {
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact className=''
            ref={gridRef} // Ref for accessing Grid's API
            rowData={store.response} // Row Data for Rows

            // @ts-ignore
            columnDefs={store.request ? getColDefs(props.featureDefs, props.variationCodeMap, store.request) : []} // Column Defs for Columns
            defaultColDef={{
              sortable: true,
            }}

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            onFirstDataRendered={onFirstDataRendered}
            onGridReady={fetchScreenerData}
            onModelUpdated={onFirstDataRendered}
            tooltipShowDelay={500}
          />
        </div>

      }
    </>
  )
}
