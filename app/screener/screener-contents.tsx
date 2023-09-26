'use client'

import { POST, ScreenerApiResult } from "./api/route";
import ScreenerTable from "./screener-table"
import { FeatureDef, fetchScreenerData, getScreenerParam, setFeatureDefsStore, setVariationCodeMapStore, variationCodeMapStore } from "./screener-store"
import { forwardRef, useEffect, useRef, useState } from "react";
import ScreenerTab from "./tab/screener-tab";
import { featureDefsStore, screenerFieldsFormStore, selectedFeaturesFormStore, toggleDialog, SelectedFeaturesForm } from './screener-store';
import { naicsCodesStore } from "../app.store";
import ScreenerLayer from "./screener-layer";
import CornerDialog from "../component/util/dialog";
// import CornerDialog from "../component/util/dialog";

// function getSelectedScreenerParam(): string {
//   const from = selectedFeaturesFormStore.getState();
//   console.log(from);
//   const to = JSON.parse(JSON.stringify(from));
//   console.log(to);
//   const entries: [string, { lowerIsBetter: boolean }][] = Object.entries(to.features);
//   const updatedFeatureObj = entries.map((e) => ({ feature: e[0], lowerIsBetter: e[1].lowerIsBetter}))
//   to.features = updatedFeatureObj;
  
//   console.log(to);
//   // return JSON.stringify(to);
//   return to;
// }

// const Layer = forwardRef(function ScreenerLayer({featureDefs, variationCodeMap, children} : {  featureDefs: FeatureDef[], variationCodeMap: Map<string, string>}, ref) {

//   const [tableData, setTableData] = useState<ScreenerApiResult[]>();

//   console.log('xxxxxx')

//   function getSelectedScreenerParam(): string {
//     const from = selectedFeaturesFormStore.getState();
//     console.log(from);
//     const to = JSON.parse(JSON.stringify(from));
//     console.log(to);
//     const entries: [string, { lowerIsBetter: boolean }][] = Object.entries(to.features);
//     const updatedFeatureObj = entries.map((e) => ({ feature: e[0], lowerIsBetter: e[1].lowerIsBetter}))
//     to.features = updatedFeatureObj;
    
//     console.log(to);
//     // return JSON.stringify(to);
//     return to;
//   }

//   function getRequest(jsonStr: string) {    
//     return new Request('http://127.0.0.1:8080/api/percentile/ranks',
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: jsonStr,
//         method: 'POST',
//         cache: 'no-store'
        
//       }
//     )
//   }

//   useEffect(() => {
//     const get = async () => {
//       const paramObj = getSelectedScreenerParam();
//       let data = await POST(getRequest(JSON.stringify(paramObj)));
//       console.log('page client');
//       console.log(data);
//       setTableData({ response: data, reqObj: paramObj });
      
//     }
//     get();
//   }, [])

//   function fetchScreenerData() {
//     const get = async () => {
//       const paramObj = getSelectedScreenerParam();
//       let data = await POST(getRequest(JSON.stringify(paramObj)));
      
//       console.log('page client');
//       console.log(data);
      
//       setTableData({ response: data, reqObj: paramObj });
      
//     }
//     get();
//   }


//   return (
//     <>
//     <div className="flex flex-col grow">
//       <div className='flex flex-row grow '>
//         <div className='flex-none w-[500px] p-1 overflow-y-scroll'>
//           {children}
//         </div>
//         <div className='flex-1 p-1'>
//         {/* <ScreenerLayer ref={layerRef} featureDefs={featureDefs} variationCodeMap={variationCodeMap} callScreeenerApi={callScreeenerApi}> */}
//           <ScreenerTable tableData={tableData} featureDefs={featureDefs} variationCodeMap={variationCodeMap}>
//             </ScreenerTable>
//           {/* </ScreenerLayer> */}
//         </div>
//       </div>
//     </div>
//     </>
//   )
// });

export default function ScreenerContent({ featureDefsJson, naicsStr }: { featureDefsJson: string, naicsStr: string }) {

  const featureDefs: FeatureDef[] = JSON.parse(featureDefsJson);

  const variationCodeMap = new Map(featureDefs.flatMap(e => e.variations.map(v => [v.code, e.code])))

  setFeatureDefsStore(featureDefs);
  // variationCodeMapStore.setState(variationCodeMap);
  setVariationCodeMapStore(variationCodeMap);

  const layerRef = useRef(null);

  //??? shows on terminal console?
  // console.log(featureDefsStore.getState()); 

  const naicsCodes = JSON.parse(naicsStr);
  naicsCodesStore.setState(naicsCodes);  

  function callScreeenerApi() {

  }



  // const [tableData, setTableData] = useState<ScreenerApiResult[]>();

  // const [selectedFeatures, setSelectedFeatures] = useState<SelectedFeaturesForm>();



  
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
  //     let data = await POST(getRequest(JSON.stringify(paramObj)));
  //     console.log('page client');
  //     console.log(data);
  //     setTableData({ response: data, reqObj: paramObj });
      
  //   }
  //   get();
  // }, [])

  // function fetchScreenerData() {
  //   const get = async () => {
  //     const paramObj = getSelectedScreenerParam();
  //     let data = await POST(getRequest(JSON.stringify(paramObj)));
      
  //     console.log('page client');
  //     console.log(data);
      
  //     setTableData({ response: data, reqObj: paramObj });
      
  //   }
  //   get();
  // }

  
  


  console.log('screener-contents!!');



  return (
    <>
      
        <ScreenerLayer featureDefs={featureDefs} variationCodeMap={variationCodeMap}>
          <ScreenerTab  featureDefs={featureDefs} naicsDefs={naicsCodes}  variationCodeMap={variationCodeMap} fetch={fetchScreenerData}></ScreenerTab>
        </ScreenerLayer>
        <CornerDialog message="You can use maximum 5 variables."></CornerDialog>
        </>
  )
}