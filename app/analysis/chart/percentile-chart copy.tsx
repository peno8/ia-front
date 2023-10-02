'use client'

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { formatNumber, formatPercent } from "@/app/utils";

export default function PercentileChart({ symbol, category, stockPercentile, sectorPercentile, variationLabels }) {
  // console.log(stockPercentile);

  const width = 300;
  const height = 200;
  const marginTop = 50;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 100;

  const chart = useRef(null);
  const gx = useRef(null);
  const gy = useRef(null);
  const tooltip = useRef(null);

  // console.log('PercentileChart')

  const x = d3.scaleLinear()
    .domain([1, 0])
    .range([width - marginRight, marginLeft]);
  // .range([height - marginBottom, marginTop]);


  // Declare the y (vertical position) scale.
  const y = d3.scalePoint()
    // .domain(stockPercentile.map(e => e[0]))
    .domain(variationLabels.map(e => e.value))
    .rangeRound([marginTop, height - marginBottom])
    .padding(1);

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.


  useEffect(() => {
    void
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
      .call(g => g.selectAll(".tick line").clone().attr("stroke-opacity", 0.1).attr("y2", -height + marginTop * 2))


  }, [gx, x]);

  useEffect(() => {
    const g = d3.select(chart.current).append("g")
      // .attr("text-anchor", "end")
      // .style("font", "10px sans-serif")
      .selectAll()
      .data(stockPercentile)
      .join("g")
      .attr("transform", e => `translate(0,${y(e[0])})`)

    g.append("line")
      .attr("stroke", "#aaa")
      .attr("x1", x(0))
      .attr("x2", x(1))
      

    g.append("g")
      .selectAll()
      .data((e) => { return [e[1]] })
      .join("circle")
      .attr("cx", d => { return x(d.p) })
      // .attr("cy", v => 100)
      .attr("fill", (d) => 'green')
      // .attr('stroke', 'red')
      .attr("r", 3.5)
      .on("pointerenter", (e, d) => {
        d3.select(e.target).style("opacity", 0.5);
        d3.select(tooltip.current)
          .style("display", null)
          .attr("font-size", 11)
          .append("text")
          .datum(d)
          .attr("text-anchor", "middle")
          .text(d => {{ return `${symbol}, V: ${formatNumber(category, d.v)}, P: ${formatNumber(category, d.p)}`}})
          .attr("fill", "currentColor")
      })
      .on("pointerleave", (e) => {
        d3.select(e.target).style("opacity", 1);
        d3.select(tooltip.current)
        .selectAll("*").remove();
      })

    const g2 = d3.select(gy.current).append("g")
      .selectAll()
      .data(sectorPercentile)
      .join("g")
      .attr("transform", e => `translate(0,${y(e[0])})`)

    g2.append("g")
      .selectAll()
      .data((d) => { return [d[1]] })
      .join("circle")
      .attr("cx", d => { return x(d.p) })
      .attr("fill", (d) => 'red')
      .attr("r", 3.5)
      .on("pointerenter", (e, d) => {
        d3.select(e.target).style("opacity", 0.5);
        d3.select(tooltip.current)
          .attr("font-size", 11)
          .append("text")
          .datum(d)
          .attr("text-anchor", "middle")
          .text(d => {{return `${'ALL'}, V: ${formatNumber(category, d.v)}, P: ${formatNumber(category, d.p)}`}})
          .attr("fill", "currentColor") 
      })
      .on("pointerleave", (e) => {
        d3.select(e.target).style("opacity", 1);
        d3.select(tooltip.current)
        .selectAll("*").remove();
      })

  }, [chart, y]);

  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y).tickFormat((d,) => variationLabels.find(e => e.value == d).label)), [gy, y]);

  return (
    <div>
      <svg ref={chart} width={width} height={height}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        <g ref={tooltip} transform={`translate(${width - 70},20)`} />
      </svg>
    </div>
  )
}