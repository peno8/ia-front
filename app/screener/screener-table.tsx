'use client'

import React, { useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { FeatureDef, getVariationLabel, SelectedFeaturesForm, tableDataStore, fetchScreenerData, getFeatureDefByVariationCode } from './screener-store';
import { formatNumber } from '../utils';
import Link from 'next/link';

interface ScreenerTableProp {
  // tableData: ScreenerApiResult[]
  featureDefs: FeatureDef[]
  variationCodeMap: Map<string, string>
}

const linkCellRenderer = ({ value }) => (
  <Link href={`/analysis/${value}`} target="_blank">{value}</Link>
);

function getColDefs(requestObj: SelectedFeaturesForm) {
  
  if (!requestObj) {
    return [];
  }

  const defaultColumnDefs = [
    
    {
      field: 'symbol',
      valueGetter: (params: any) => params.data.percentile.symbol,
      cellRenderer: linkCellRenderer,
      headerTooltip: 'Symbol',
    },
    {
      field: 'cq',
      valueGetter: (params: any) => params.data.percentile.cq,
      headerTooltip: 'Quarter by calandar'
    }]

  const valueColDefs = requestObj.features.flatMap((e: { feature: string, lowerIsBetter: boolean }) => {
    
    const name = getVariationLabel(e.feature);
    const featureDef = getFeatureDefByVariationCode(e.feature);
    return [{
      field: name,
      valueGetter: (params: any) => {
        const value = params.data.percentile.percentiles[e.feature] ? params.data.percentile.percentiles[e.feature]['v'] : 0;
        return formatNumber(featureDef!.category, value);
      },
      headerTooltip: name
    }, {
      field: 'Percentile',
      valueGetter: (params: any) => {
        const obj = params.data.percentile.percentiles[e.feature]
        const value = obj ? e.lowerIsBetter ? obj['p'] : 1 - obj['p'] : undefined;
        return value === 0 || value ? formatNumber("", value) : undefined;
      },
      headerTooltip: 'Percentile',
    }]
  })

  const scoreColDef = [{
    field: 'Score',
    valueGetter: (params: any) => formatNumber("", params.data.score),
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

  return (
    <>
      {
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact className=''
            ref={gridRef} // Ref for accessing Grid's API
            rowData={store.response} // Row Data for Rows

            // @ts-ignore
            columnDefs={store.request ? getColDefs(store.request) : []} // Column Defs for Columns
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
