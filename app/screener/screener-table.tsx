'use client'

import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { ScreenerApiResult } from './api/route';

interface ScreenerTableProp {
  tableData: ScreenerApiResult[]
}

export default function ScreenerTable(props: ScreenerTableProp) {
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'symbol', filter: true,
      valueGetter: (params: any) => params.data.percentile.symbol
    },
    { field: 'cq', filter: true, valueGetter: (params: any) => params.data.percentile.cq },
    {
      field: 'profit ratio',
      valueGetter: (params: any) => params.data.percentile.percentiles['NI_T|R_T'],
      width: 300
    },
    {
      field: 'Percentile',
      valueGetter: (params: any) => params.data.score
    },
  ]);
  const gridRef = useRef();
  
  return (
    <div className='pl-1 pt-5'>
      <div className="ag-theme-alpine w-full h-[500px]">
        <AgGridReact className=' w-full'
          // ref={gridRef} // Ref for accessing Grid's API

          
          rowData={props.tableData} // Row Data for Rows
          // rowData={props.tableData} // Row Data for Rows
          // @ts-ignore
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={{
            sortable: true
          }} // Default Column Properties

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows

        // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  )
}
