'use client'

import { useEffect, useRef, useState } from "react";
import { readFileFromSharedDist } from "../utils";
import { featureDataStore, fetchFeatureData, getRequest } from "./analysis-store";

import * as d3 from "d3";
import PercentileChart from "./chart/percentile-chart";

export default function AnalysisContent( {  }) {
  useEffect(() => {
    //   const get = async () => {
        
    //     let data = await GET(getRequest('AAPL'));
    //     featureDataStore.setState({ data: data });
    //     console.log(data);
    //     // return data;
    // }
    // get();
      
      fetchFeatureData('AAPL')
    }, [])
  const featureData = featureDataStore((state) => state.data);
  console.log('AnalysisContent');
  console.log(featureData);

  const percentileData = [
    {feature: 'E', v: 10065944000, p: 0.5474613686534217},
    {feature: 'GW|A', v: 0.009444, p: 0.08549222797927461}
  ]

  const sectorPercentileData = [
    {feature: 'E', v: 9065944000, p: 0.5001},
    {feature: 'GW|A', v: 0.029444, p: 0.499}
  ]

  return (
    <>
    {featureData ? 
      <div>
      <div>{featureData.symbol}</div>
      <div>
          {featureData.features? <Chart data={featureData.features['CA|A']}></Chart> : null}
      </div>
      <div>
        {featureData.features? <PercentileChart data={percentileData} sectorPercentileData={sectorPercentileData}></PercentileChart> : null}
        
      </div>
      </div> : null
      }
    </>
  )
}

function Chart( { data }) {

  console.log('Chart')
  const width = 300;
  const height = 200;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  const chart = useRef(null);
  const gx = useRef(null);
  const gy = useRef(null);
  

  // Declare the x (horizontal position) scale.
  const x = d3.scaleBand()
      .domain(data.map(e => e.cq)) // descending frequency
      .range([width - marginRight, marginLeft])
      .padding(0.1);
  
  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
      .attr("x", (d) => x(d.cq))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (%)"));
  
  useEffect(() =>  { void
    d3.select(gx.current)

    // d3.select(chart.current)
    // .append('g')
    // .attr("transform", `translate(0,${height - marginBottom})`)
    // @ts-ignore
    .call(d3.axisBottom(x).tickValues(x.domain().filter(e => {
      console.log('aaaa');
      const arr = e.split('-');
      return parseInt(arr[0]) % 2 === 0 && arr[1] === 'Q4'}))
    .tickFormat((d, i) => d.slice(0, 4))
    .tickSizeOuter(0))}, [gx, x]);

  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  // Return the SVG element.
  return (
    <div>
    <svg ref={chart} width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <g fill="steelblue">
        {data.map(e => (<rect key={e.cq} x={x(e.cq)} y={y(e.value)} height={y(0) - y(e.value)} width={x.bandwidth()} />))}
      </g>
      {/* <g ref={gy} transform={`translate(${marginLeft},0)`} /> */}
      {/* <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g> */}
    </svg>
    </div>
  )
}
