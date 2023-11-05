'use client'

import React, { useRef, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { getVariationLabel, SelectedFeaturesForm, tableDataStore, fetchScreenerData, getFeatureDefByVariationCode, getSelectedScreenerParam } from './screener-store';
import { formatNumber } from '../utils';
import { CompanyDef, companyDefMap } from '../app.store';
import { Anchor } from '@mantine/core';
import { useWindowWidth } from '@react-hook/window-size';

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
      tooltipValueGetter: (params: any) => getValue(params),
      sortable: false
    }
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

export default function ScreenerTable() {

  const gridRef = useRef(null);
  const store = tableDataStore((state) => state);

  function onFirstDataRendered() {
    if (store.response && store.response.length > 0) {
      // @ts-ignore
      gridRef.current.api.sizeColumnsToFit();
    }
  }

  useEffect(() => {
    fetchScreenerData();
  }, [])

  const compDefMap = companyDefMap;

  if (!store?.response) return null;

  return (
    <>
      {
        <AgGridReact
          ref={gridRef}
          rowData={store?.response}

          // @ts-ignore
          columnDefs={store?.request ? getColDefs(store.request, compDefMap) : []} // Column Defs for Columns
          defaultColDef={{
            // sortable: true,
            resizable: true,
            maxWidth: 300,
          }}

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          // onFirstDataRendered={onFirstDataRendered}
          // onGridReady={fetchScreenerData}
          // onGridColumnsChanged={onFirstDataRendered}
          // onModelUpdated={onFirstDataRendered}
          // onGridSizeChanged={onFirstDataRendered}
          // tooltipShowDelay={500}
          onRowDataUpdated={onFirstDataRendered}
          suppressRowHoverHighlight={true}
        />
      }
    </>
  )
}
