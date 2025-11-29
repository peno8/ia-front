'use client'

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { formatNumber, formatNumber2, formatPercent } from "@/app/utils";
import { FeatureDef } from "@/app/screener/screener-store";
import { PercentileEntry } from "./feature-charts";

export default function PercentileChart({ symbol, featureDef, category, stockPercentile, sectorPercentile, variationLabels }:
  { symbol: string, 
    featureDef: FeatureDef, 
    category: string, 
    stockPercentile: PercentileEntry, 
    sectorPercentile: PercentileEntry, 
    variationLabels: { value: string, label: string}[] }) {

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
  const area = useRef(null);
  const compareArea = useRef(null);

  const lowerIsBetter = featureDef.lowerIsBetter;
  console.log(featureDef)
  // X scale
  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([width - marginRight, marginLeft]);

  // Y scale
  const y = d3.scalePoint()
    // .domain(stockPercentile.map(e => e[0]))
    .domain(variationLabels.map(e => e.value))
    .rangeRound([marginTop, height - marginBottom])
    .padding(1);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const getPercentile = (value: number) => lowerIsBetter ? value : 1 - value;

  function getDotColor(value: number) {
    if(getPercentile(value) < 0.5) return 'steelblue'
    else return '#F78C6C';
  }

  function getLabelStr(value: number, percentile: number, name: string){ 
    let prec = 1
    let unit = "%"
    
    if (featureDef.featureType === 'MILLION') {

      if(value >= 10000000) {
          prec = 1000000
          unit = "T"
      } else if(value >= 10000) {
          prec = 1000
          unit = "B"
      } else {
        unit = "M"
      }
    } else if (featureDef.featureType === 'NOMINAL') {
      if(value >= 10000000) {
        prec = 1000000
        unit = "M"
      } else if(value >= 10000) {
          prec = 1000
          unit = "K"
      } else {
        unit = ""
      }
    } else if(featureDef.featureType === 'RATIO') {
      unit = ""  
    }

    let formattedValue = ''
    if (featureDef.featureType === 'MILLION' || featureDef.featureType === 'NOMINAL') {
      formattedValue = formatNumber2(value, prec)
    } else if (featureDef.featureType === 'RATIO') {
      formattedValue = formatNumber2(value, 1, 1)
    } else {
      formattedValue = formatPercent(value)
    }
    
    return `${name}, Value: ${formattedValue}${unit}, Percentile: ${formatNumber("", getPercentile(percentile))}` }
  
  useEffect(() => {
    void
      d3.select(gx.current)
        // @ts-ignore
        .call(d3.axisBottom(x).ticks(5, "%"))
  }, [gx, x]);

  // Stock dots
  useEffect(() => {
    d3.select(compareArea.current)
    .selectAll("*").remove();

    d3.select(compareArea.current)
      .selectAll()
      .data(sectorPercentile)
      .join("circle")
      .attr("cx", d => { return x(getPercentile(d[1].p)) })
      // @ts-ignore
      .attr("cy", d => { return y(d[0]) })
      .attr("fill", (d) => 'gray')
      .attr("r", 5)
      .on("pointerenter", (e, d) => {
        d3.select(e.target).style("opacity", 0.5);
        d3.select(tooltip.current)
          .attr("font-size", 11)
          .append("text")
          .datum(d)
          .attr("text-anchor", "left")
          .text(d => { return getLabelStr(d[1].v, d[1].p, 'All') })
          .attr("fill", "currentColor")
      })
      .on("pointerleave", (e) => {
        d3.select(e.target).style("opacity", 1);
        d3.select(tooltip.current)
          .selectAll("*").remove();
      })

  }, [sectorPercentile]);


  // Industry dots
  useEffect(() => {
    d3.select(area.current)
    .selectAll("*").remove();

    d3.select(area.current)
    .selectAll()
    .data([0.2, 0.4, 0.6, 0.8])
    // .data([0.8, 0.6, 0.4, 0.2])
    // .data((d) => { return [d[1]] })
    .join("line")
    .attr('x1', v => x(v))
    .attr('x2', v => x(v))
    .attr('y1', height - marginBottom)
    .attr('y2', marginTop)
    .attr("stroke", "#aaa")
    .attr("stroke-opacity", 0.5)//.attr("y2", -height + marginTop * 2)

    d3.select(area.current)
      .selectAll()
      .data(stockPercentile)
      .join("circle")
      .attr("cx", d => { return x(getPercentile(d[1].p)) })
      // @ts-ignore
      .attr("cy", d => { return y(d[0]) })
      .attr("fill", d => getDotColor(d[1].p))
      .attr("r", 5)
      .on("pointerenter", (e, d) => {
        d3.select(e.target).style("opacity", 0.5);
        d3.select(tooltip.current)
          .attr("font-size", 11)
          .append("text")
          .datum(d)
          .attr("text-anchor", "left")
          .text((d) => { 
            // { 
            // let prec = 1
            // let unit = "%"
            
            // if (featureDef.featureType === 'MILLION') {

            //   if(d[1].v >= 10000000) {
            //       prec = 1000000
            //       unit = "T"
            //   } else if(d[1].v >= 10000) {
            //       prec = 1000
            //       unit = "B"
            //   } else {
            //     unit = "M"
            //   }
            // } else if (featureDef.featureType === 'NOMINAL') {
            //   if(d[1].v >= 10000000) {
            //     prec = 1000000
            //     unit = "M"
            //   } else if(d[1].v >= 10000) {
            //       prec = 1000
            //       unit = "K"
            //   } else {
            //     unit = ""
            //   }
            // } else if(featureDef.featureType === 'RATIO') {
            //   unit = ""  
            // }

            // let formattedValue = ''
            // if (featureDef.featureType === 'MILLION' || featureDef.featureType === 'NOMINAL') {
            //   formattedValue = formatNumber2(d[1].v, prec)
            // } else if (featureDef.featureType === 'RATIO') {
            //   formattedValue = formatNumber2(d[1].v, 1, 1)
            // } else {
            //   formattedValue = formatPercent(d[1].v)
            // }
            
            // return `${symbol}, Value: ${formattedValue}${unit}, Percentile: ${formatNumber("", getPercentile(d[1].p))}` } 
            return getLabelStr(d[1].v, d[1].p, symbol)
          })
          .attr("fill", "currentColor")
      })
      .on("pointerleave", (e) => {
        d3.select(e.target).style("opacity", 1);
        d3.select(tooltip.current)
          .selectAll("*").remove();
      })

  }, [stockPercentile]);

  useEffect(() => {
    d3.select(area.current)
      .selectAll()
      .data(stockPercentile)
      .join("line")
      .attr("transform", e => `translate(0,${y(e[0])})`)
      .attr("x1", x(0))
      .attr("x2", x(1))
      .attr("stroke", "#aaa")
      .attr("stroke-opacity", 0.5)


  }, [stockPercentile]);
  // @ts-ignore
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y).tickFormat((d,) => variationLabels.find(e => e.value == d).label)), [gy, y]);

  return (
    <div>
      <svg ref={chart} width={width} height={height}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        <g ref={area} />
        <g ref={compareArea} />
        <g ref={tooltip} transform={`translate(${100},40)`} />
      </svg>
    </div>
  )
}