// 'use client'

import { useEffect } from "react";
import Analysis from "./analysis";
import AnalysisContent from "./analysis-content";
import { POST } from "./api/route";
import { getRequest } from "../utils";
import { featureDefsStringStore, setFeatureDefsStore, setVariationCodeMapStore } from "../screener/screener-store";


export default function AnalysisPage() {
  const featureDefsJson = featureDefsStringStore.getState();

  // setFeatureDefsStore(featureDefs);
  // setVariationCodeMapStore(variationCodeMap);
//   console.log('AnalysisPage')

//   useEffect(()  => {
//     const get = async () => {
//         const request = {
//           cq: '2023-2Q',
//           sector: 'ALL|X',
//           symbol: 'AAPL'
//         }
//         let data = await POST(getRequest(JSON.stringify(request), 'http://127.0.0.1:8080/api/feature'));
//         console.log(data)
//         // tableDataStore.setState({ response: data, request: request });
//     }
//     get();
// }, [])

  return (
    <AnalysisContent featureDefsJson={featureDefsJson}></AnalysisContent>
  )
}