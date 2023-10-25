'use client'

import React, { useRef, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { FeatureDef, getVariationLabel, SelectedFeaturesForm, tableDataStore, fetchScreenerData, getFeatureDefByVariationCode } from './screener-store';
import { formatNumber } from '../utils';
import Link from 'next/link';
import { CompanyDef, companyDefMap } from '../app.store';
import { Anchor, Box, Loader, LoadingOverlay } from '@mantine/core';

interface ScreenerTableProp {
  // tableData: ScreenerApiResult[]
  featureDefs: FeatureDef[]
  variationCodeMap: Map<string, string>
}

const linkCellRenderer = ({ value }: { value: string }) => (
  <Anchor target="_blank" href={`/analysis/${value}`}>{value}</Anchor>
);

function getColDefs(requestObj: SelectedFeaturesForm, compDefMap: Map<string, CompanyDef>) {
  
  if (!requestObj) {
    return [];
  }

  const defaultColumnDefs = [
    {
      field: 'Rank',
      valueGetter: (params: any) => params.node.rowIndex + 1,
      headerTooltip: 'Rank',
      width: 60,
      suppressSizeToFit: true
      // tooltipValueGetter: (params: any) => params.data.percentile.symbol,
      // suppressRowHoverHighlight: false

    },
    {
      field: 'symbol',
      valueGetter: (params: any) => params.data.percentile.symbol,
      cellRenderer: linkCellRenderer,
      headerTooltip: 'Symbol',
      width: 80,
      suppressSizeToFit: true
      // tooltipValueGetter: (params: any) => params.data.percentile.symbol,
      // suppressRowHoverHighlight: false

    },
    {
      field: 'name',
      valueGetter: (params: any) => compDefMap.get(params.data.percentile.symbol)?.name,
      headerTooltip: 'Name',
      // minWidth: 200,
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
      return value === 0 || value ? formatNumber("", value) : "";
    }
    
    return [{
      field: name,
      valueGetter: (params: any) => {
        return `${getValue(params)} (${getPercentile(params)})`;
      },
      headerTooltip: name + ' and percentile',
      tooltipValueGetter:  (params: any) => getValue(params),
      sortable: false
    }, 
    // {
    //   field: 'Percentile',
    //   valueGetter: (params: any) => {
    //     return getPercentile(params);
    //   },
    //   headerTooltip: 'Percentile',
    //   tooltipValueGetter:  (params: any) => getPercentile(params)
    // }
  ]
  })

  const scoreColDef = [{
    field: 'Percentile',
    valueGetter: (params: any) => formatNumber("", params.data.score),
    headerTooltip: 'Overall Percentile',
    tooltipValueGetter: (params: any) => formatNumber("", params.data.score),
  }]

  // @ts-ignore
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

  useEffect(() => {
    fetchScreenerData();
  }, [])

  const compDefMap = companyDefMap;

  return (
    <>
    {/* <Box pos="relative"> */}
      { 
        // <div className="ag-theme-alpine dark:ag-theme-alpine-dark dark:text-red-700 w-full h-full">
          <AgGridReact className=''
            ref={gridRef} // Ref for accessing Grid's API
            rowData={store?.response} // Row Data for Rows

            // @ts-ignore
            columnDefs={store?.request ? getColDefs(store.request, compDefMap) : []} // Column Defs for Columns
            defaultColDef={{
              // sortable: true,
              resizable: true,
              maxWidth: 300,
            }}

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            onFirstDataRendered={onFirstDataRendered}
            // onGridReady={fetchScreenerData}
            onModelUpdated={onFirstDataRendered}
            onGridSizeChanged={onFirstDataRendered}
            tooltipShowDelay={500}
            suppressRowHoverHighlight={true}
          />
          
          // null 
          // <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          // <Loader></Loader>
        // </div>

      }
      {/* </Box> */}
    </>
  )
}
