import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Select } from "@mantine/core";
import { getFeatureDef } from "@/app/screener/screener-store";
import { formatNumber, formatPercent } from "@/app/utils";

export default function BarChart({ data, variationLabels, category }) {
    console.log(data);
    console.log(variationLabels);
    const defaultKey = variationLabels[0].value
    console.log(defaultKey);
    const defaultChartData = data.find(e => e.key === defaultKey).features;

    const [chartData, setChartData] = useState(defaultChartData);

    function changeChartData(key: string) {
        console.log(key);
        const chartData = data.find(e => e.key === key).features;
        setChartData(chartData);
    }

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
    const tooltip = useRef(null);
    const rects = useRef(null);


    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(chartData.map(e => e.cq)) // descending frequency
        .range([width - marginRight, marginLeft])
        .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.value)])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    useEffect(() => {
        void
        d3.select(gx.current)

            // d3.select(chart.current)
            // .append('g')
            // .attr("transform", `translate(0,${height - marginBottom})`)
            // @ts-ignore
            .call(d3.axisBottom(x).tickValues(x.domain().filter(e => {
                console.log('aaaa');
                const arr = e.split('-');
                return parseInt(arr[0]) % 2 === 0 && arr[1] === 'Q4'
            }))
                .tickFormat((d, i) => d.slice(0, 4))
                .tickSizeOuter(0))
    }, [gx, x]);

    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y).ticks(5, "%")), [gy, y]);

    useEffect(() => {
        d3.select(rects.current)
        .selectAll()
        .data(chartData)
        .join("rect")
        .attr("x", d => { console.log(x(d.p)); return x(d.cq) })
        .attr("y", d => { return y(d.value) })
        .attr("height", d => { return y(0) - y(d.value) })
        .attr("width", () => { return x.bandwidth() })
        .on("pointerenter", (e, d) => {
            d3.select(e.target).style("opacity", 0.5);
            d3.select(tooltip.current)
              .style("display", null)
              .attr("font-size", 11)
              .append("text")
              .datum(d)
              .attr("text-anchor", "middle")
              .text(d => {{console.log(d); return `CQ: ${d.cq}, ${formatNumber(category, d.value)}`}})
              .attr("fill", "currentColor") 
          })
          .on("pointerleave", (e) => {
            d3.select(e.target).style("opacity", 1);
            d3.select(tooltip.current)
            .selectAll("*").remove();
          })

    }, [])

    // Return the SVG element.
    return (
        <div>
            <Select
                size="xs"
                radius="xs"
                // placeholder="Select Feature"
                data={variationLabels}
                defaultValue={defaultKey}
                onChange={changeChartData}
            />
            <svg ref={chart} width={width} height={height}>
                <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
                <g ref={gy} transform={`translate(${marginLeft},0)`} />
                <g ref={rects} fill="steelblue">
                    {/* {chartData.map(e => (<rect key={e.cq} x={x(e.cq)} y={y(e.value)} height={y(0) - y(e.value)} width={x.bandwidth()} />))} */}
                </g>
                <g ref={tooltip} transform={`translate(${width - 70},20)`} />
                {/* <g ref={gy} transform={`translate(${marginLeft},0)`} /> */}
                {/* <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
        <g fill="white" stroke="currentColor" stroke-width="1.5">
          {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
        </g> */}
            </svg>
        </div>
    )
}
