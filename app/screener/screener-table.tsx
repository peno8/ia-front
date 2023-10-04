'use client'

import React, { useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { FeatureDef, getVariationLabel, SelectedFeaturesForm, tableDataStore, fetchScreenerData, getFeatureDefByVariationCode } from './screener-store';
import { formatNumber } from '../utils';
import Link from 'next/link';
import { CompanyDef, companyDefMap } from '../app.store';

interface ScreenerTableProp {
  // tableData: ScreenerApiResult[]
  featureDefs: FeatureDef[]
  variationCodeMap: Map<string, string>
}

const linkCellRenderer = ({ value }: { value: string }) => (
  <Link href={`/analysis/${value}`} target="_blank">{value}</Link>
);

function getColDefs(requestObj: SelectedFeaturesForm, compDefMap: Map<string, CompanyDef>) {
  
  if (!requestObj) {
    return [];
  }

  const defaultColumnDefs = [
    
    {
      field: 'symbol',
      valueGetter: (params: any) => params.data.percentile.symbol,
      cellRenderer: linkCellRenderer,
      headerTooltip: 'Symbol',
      minWidth: 100,
      tooltipValueGetter: (params: any) => params.data.percentile.symbol,
    },
    {
      field: 'name',
      valueGetter: (params: any) => compDefMap.get(params.data.percentile.symbol)?.name,
      headerTooltip: 'Name',
      minWidth: 200,
      tooltipValueGetter: (params: any) => compDefMap.get(params.data.percentile.symbol)?.name
    }
    // {
    //   field: 'cq',
    //   valueGetter: (params: any) => params.data.percentile.cq,
    //   headerTooltip: 'Quarter by calandar'
    // }
  ]
    // @ts-ignore
  const valueColDefs = requestObj.features.flatMap((e: { feature: string, lowerIsBetter: boolean }) => {
    
    const name = getVariationLabel(e.feature);
    const featureDef = getFeatureDefByVariationCode(e.feature);

    function getValue(params: any) {
      const value = params.data.percentile.percentiles[e.feature] ? params.data.percentile.percentiles[e.feature]['v'] : 0;
      return formatNumber(featureDef!.category, value);
    }

    function getPercentile(params: any) {
      const obj = params.data.percentile.percentiles[e.feature]
      const value = obj ? e.lowerIsBetter ? obj['p'] : 1 - obj['p'] : undefined;
      return value === 0 || value ? formatNumber("", value) : undefined;
    }
    
    return [{
      field: name,
      valueGetter: (params: any) => {
        // const value = params.data.percentile.percentiles[e.feature] ? params.data.percentile.percentiles[e.feature]['v'] : 0;
        // return formatNumber(featureDef!.category, value);
        return getValue(params);
      },
      headerTooltip: name,
      tooltipValueGetter:  (params: any) => getValue(params)
    }, {
      field: 'Percentile',
      valueGetter: (params: any) => {
        // const obj = params.data.percentile.percentiles[e.feature]
        // const value = obj ? e.lowerIsBetter ? obj['p'] : 1 - obj['p'] : undefined;
        // return value === 0 || value ? formatNumber("", value) : undefined;
        return getPercentile(params);
      },
      headerTooltip: 'Percentile',
      tooltipValueGetter:  (params: any) => getPercentile(params)
    }]
  })

  const scoreColDef = [{
    field: 'Score',
    valueGetter: (params: any) => formatNumber("", params.data.score),
    headerTooltip: 'Overall Percentile',
    tooltipValueGetter: (params: any) => formatNumber("", params.data.score),
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

  const compDefMap = companyDefMap;

  return (
    <>
      {
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact className=''
            ref={gridRef} // Ref for accessing Grid's API
            rowData={store?.response} // Row Data for Rows

            // @ts-ignore
            columnDefs={store?.request ? getColDefs(store.request, compDefMap) : []} // Column Defs for Columns
            defaultColDef={{
              sortable: true,
              resizable: true,
              // minWidth: 100,
            }}

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            onFirstDataRendered={onFirstDataRendered}
            onGridReady={fetchScreenerData}
            onModelUpdated={onFirstDataRendered}
            onGridSizeChanged={onFirstDataRendered}
            tooltipShowDelay={500}
          />
        </div>

      }
    </>
  )
}
