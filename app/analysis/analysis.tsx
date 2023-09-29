'use client'

import { useEffect, useRef, useState } from "react";
import { readFileFromSharedDist } from "../utils";
import { featureDataStore, fetchFeatureData, getRequest } from "./analysis-store";

import * as d3 from "d3";
import PercentileChart from "./chart/percentile-chart";
import AnalysisContent from "./analysis-content";


export default function Analysis() {

  console.log('Analysis');



  // fetchFeatureData('AAPL')
  // console.log(featureData);

  return (
    <div>
      <AnalysisContent></AnalysisContent>
      
    </div>
  )
}