'use client'

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function PercentileChart( { data, sectorPercentileData }) {
  const width = 300;
  const height = 200;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 20;

  const chart = useRef(null);
  const gx = useRef(null);
  // const gy = useRef(null);
  
  console.log('PercentileChart')
  
  const x = d3.scaleLinear()
  .domain([0, 1])
  .range([width - marginRight, marginLeft]);
  // .range([height - marginBottom, marginTop]);
  
  
  // Declare the y (vertical position) scale.
  const y = d3.scalePoint()
  .domain(data.map(e => e.feature))
  .rangeRound([marginTop, height - marginBottom])
  .padding(1);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  
  
  useEffect(() =>  { void
    d3.select(gx.current)

    // d3.select(chart.current)
    // .append('g')
    // .attr("transform", `translate(0,${height - marginBottom})`)
    // @ts-ignore
    .call(d3.axisBottom(x).ticks(5, "%"))
    // .call(g => g.append("text")
    //         .text("population →")
    //         .attr("fill", "currentColor")
    //         .attr("transform", `translate(${0},0)`)
    //         .attr("text-anchor", "end")
    //         .attr("dy", 0)
    //   )
      .call(g => g.selectAll(".tick line").clone().attr("stroke-opacity", 0.1).attr("y2", -height + marginBottom * 2))
      
  
  }, [gx, x]);

  useEffect(() => { const g = d3.select(chart.current).append("g")
  // .attr("text-anchor", "end")
  // .style("font", "10px sans-serif")
  .selectAll()
  .data(data)
  .join("g")
  .attr("transform", e => `translate(0,${y(e.feature)})`)

  g.append("line")
      .attr("stroke", "#aaa")
      .attr("x1",x(0))
      .attr("x2", x(1))
  g.append("g")
      .selectAll()
      .data((e) => {console.log(e); return [e.p]})
      .join("circle")
        .attr("cx", v => {console.log(x(v)); return x(v)})
        // .attr("cy", v => 100)
        .attr("fill", (d) => 'green')
        // .attr('stroke', 'red')
        .attr("r", 3.5)

  const g2 = d3.select(chart.current).append("g")   
  .selectAll()
  .data(sectorPercentileData)
  .join("g")
  .attr("transform", e => `translate(0,${y(e.feature)})`)

  g2.append("g")
      .selectAll()
      .data((e) => {console.log(e); return [e.p]})
      .join("circle")
        .attr("cx", v => {console.log(x(v)); return x(v)})
        // .attr("cy", v => 100)
        .attr("fill", (d) => 'red')
        // .attr('stroke', 'red')
        .attr("r", 3.5)    
      
      }, [chart, y]);

  // useEffect(() => void d3.select(chart.current).append("line")
  // .attr("stroke", "#aaa")
  // .attr("x1", ([, values]) => x(d3.min(values, d => d.share)))
  // .attr("x2", ([, values]) => x(d3.max(values, d => d.share))), [gy, y]);

  // Return the SVG element.
  return (
    <div>
    <svg ref={chart} width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      {/* <g ref={gy} transform={`translate(${marginLeft},0)`} /> */}
      {/* <g fill="steelblue">
        {data.map(e => (<rect key={e.cq} x={x(e.cq)} y={y(e.value)} height={y(0) - y(e.value)} width={x.bandwidth()} />))}
      </g> */}

    </svg>
    </div>
  )
}