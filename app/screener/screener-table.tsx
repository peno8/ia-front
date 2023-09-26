'use client'

import React, { useState, useRef, useEffect, useCallback, Children } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { POST, ScreenerApiResult } from './api/route';
import { FeatureDef, selectedFeaturesFormStore, selectedVariableText, SelectedFeaturesForm, toggleDialog, tableDataStore, fetchScreenerData } from './screener-store';
import CornerDialog from '../component/util/dialog';

interface ScreenerTableProp {
  tableData: ScreenerApiResult[]
  featureDefs: FeatureDef[]
  variationCodeMap: Map<string, string>
  // selectedFeatures: SelectedFeaturesForm
}

function col(featureDefs, variationCodeMap, requestObj) {
  console.log(requestObj)

  if(!requestObj) {
    return [];
  }

  const defaultColumnDefs = [
    // {headerName: "Key", field: "my_unique_id", hide: true, valueGetter: (params: any) => Math.random()},
    {
      field: 'symbol', 
      // filter: true,
      valueGetter: (params: any) => params.data.percentile.symbol,
      headerTooltip: 'Symbol'
      // suppressSizeToFit: true
    },
    { field: 'cq', 
    // filter: true, 
    valueGetter: (params: any) => params.data.percentile.cq,
    headerTooltip: 'Quarter by calandar'
    // suppressSizeToFit: true 
  }]

  const valueColDefs = requestObj.features.flatMap(e => {
    console.log(e);
    const name = selectedVariableText(featureDefs, variationCodeMap, e.feature);
    // console.log(e.feature);
    return [{
      field: name,
      // filter: true,
      valueGetter: (params: any) => {
        // console.log(params.data)
        return params.data.percentile.percentiles[e.feature] ? params.data.percentile.percentiles[e.feature]['v'] : 0;
      },
      headerTooltip: name
      // suppressSizeToFit: true
    }, {
      field: 'Percentile',
      // filter: true,
      valueGetter: (params: any) => {
        const obj = params.data.percentile.percentiles[e.feature]
        return obj ? e.lowerIsBetter ? obj['p'] : 1 - obj['p'] : undefined;
      },
      headerTooltip: 'Percentile',
      // suppressSizeToFit: true
    }]
  })

  const scoreColDef = [{
    field: 'Score',
    // filter: true,
    valueGetter: (params: any) => params.data.score,
    headerTooltip: 'Overall Percentile'
  }]

  const allColDefs = defaultColumnDefs.concat(valueColDefs, scoreColDef)
  return allColDefs;
}

export default function ScreenerTable(props: ScreenerTableProp) {

  const gridRef = useRef();

  console.log(props.tableData);

  const store = tableDataStore((state) => state);

  

  function getSelectedScreenerParam(): string {
    const from = selectedFeaturesFormStore.getState();
    console.log(from);
    const to = JSON.parse(JSON.stringify(from));
    console.log(to);
    const entries: [string, { lowerIsBetter: boolean }][] = Object.entries(to.features);
    const updatedFeatureObj = entries.map((e) => ({ feature: e[0], lowerIsBetter: e[1].lowerIsBetter}))
    to.features = updatedFeatureObj;
    
    console.log(to);
    // return JSON.stringify(to);
    return to;
  }

  function getRequest(jsonStr: string) {    
    return new Request('http://127.0.0.1:8080/api/percentile/ranks',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonStr,
        method: 'POST',
        cache: 'no-store'
        
      }
    )
  }
  // useEffect(() => {
  //   const get = async () => {
  //     const paramObj = getSelectedScreenerParam();

  //     setTimeout(() => {

  //     POST(getRequest(JSON.stringify(paramObj)))
  //       .then((data) => tableDataStore.setState({ response: data, reqObj: paramObj }))
  //       // .then(gridRef.current.api.sizeColumnsToFit())
      
  //     // console.log('page client');
  //     // console.log(data);
      
  //     // tableDataStore.setState({ response: data, reqObj: paramObj });
  //   }, 0)
  // }
  // get();
  // }, [])

  function call() {
    onFirstDataRendered();
    // gridRef.current.api.sizeColumnsToFit();

  }
  
  const onFirstDataRendered = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);



  return (
    <>
    {
    // props.tableData?.response ? 
    <div className="ag-theme-alpine w-full h-full">
      
      <AgGridReact className=''
        ref={gridRef} // Ref for accessing Grid's API


        rowData={store.response} // Row Data for Rows
        // rowData={props.tableData} // Row Data for Rows
        // @ts-ignore
        columnDefs={store.reqObj ? col(props.featureDefs, props.variationCodeMap, store.reqObj) : []} // Column Defs for Columns
        defaultColDef={{
          sortable: true,
          
        }} // Default Column Properties

        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        // rowSelection='multiple' // Options - allows click selection of rows
        onFirstDataRendered={onFirstDataRendered}
        // modelUpdated={api.sizeColumnsToFit()}
        onGridReady={fetchScreenerData}
      // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
       onModelUpdated={onFirstDataRendered}
       tooltipShowDelay={500}
      />
      {/* {props.children} */}
      {/* <CornerDialog opened={opened} close={close} message='You can select maximum 5 variables.'></CornerDialog> */}
      
    </div> 
    // : <div></div>

      }
      </>
  )
}
