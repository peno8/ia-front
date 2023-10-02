import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Select } from "@mantine/core";
import { getFeatureDef } from "@/app/screener/screener-store";
import { formatNumber, formatPercent } from "@/app/utils";

export default function BarChartContainer({ featureDef, data, variationLabels, category }) {
    const [key, setKey] = useState(variationLabels[0].value);

    const chartData = data.find(e => e.key === key).features;

    function changeChartData(key: string) {
        console.log(key);
        setKey(key);
    }

    console.log(chartData);

    return (
        <div className="mb-2 flex flex-row">
            <div className="flex flex-col items-left w-[12rem]">
                <div className="mr-2">{featureDef.desc}</div>
                <Select
                    // variant="unstyled"
                    size="xs"
                    radius="xs"
                    // placeholder="Select Feature"
                    data={variationLabels}
                    defaultValue={variationLabels[0].value}
                    onChange={changeChartData}
                    className="w-[150px]"
                />
            </div>
            <BarChart chartData={chartData} category={category} />
        </div>
    )


}

export function BarChart({ chartData, category }) {

    console.log(chartData);

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

    let minYaxisValue = d3.min(chartData, (d) => d.value);
    if (category === 'SIZE' && minYaxisValue! > '0') minYaxisValue = '0';

    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(chartData.map(e => e.cq)) // descending frequency
        .range([width - marginRight, marginLeft])
        .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([minYaxisValue, d3.max(chartData, (d) => d.value)])
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
                // @ts-ignore
                .call(d3.axisBottom(x).tickValues(x.domain().filter(e => {
                    const arr = e.split('-');
                    return parseInt(arr[0]) % 2 === 0 && arr[1] === 'Q4'
                }))
                    .tickFormat((d, i) => d.slice(0, 4))
                    .tickSizeOuter(0))
    }, [gx, x, chartData]);

    useEffect(() => {
        if (category === 'SIZE') {
            d3.select(gy.current).call(d3.axisLeft(y).ticks(5).tickFormat((v,) => `${formatNumber(category, v)}B`))
        } else {
            d3.select(gy.current).call(d3.axisLeft(y).ticks(5, '%'))
        }
    }, [gy, y, chartData]);

    useEffect(() => {
        console.log("effect")
        d3.select(rects.current)
            .selectAll("*").remove();

        d3.select(rects.current)
            .selectAll()
            .data(chartData)
            .join("rect")
            .attr("x", d => { return x(d.cq) })
            .attr("y", d => { return y(d.value) })
            .attr("height", d => { return y(minYaxisValue) - y(d.value) })
            .attr("width", () => { return x.bandwidth() })
            .attr("fill", d => d.value <= 0 ? "#F78C6C" : "steelblue")
            .on("pointerenter", (e, d) => {
                d3.select(e.target).style("opacity", 0.5);
                d3.select(tooltip.current)
                    .style("display", null)
                    .attr("font-size", 11)
                    .append("text")
                    .datum(d)
                    .attr("text-anchor", "middle")
                    .text(d => { { return `CQ: ${d.cq}, ${formatNumber(category, d.value)}` } })
                    .attr("fill", "currentColor")
            })
            .on("pointerleave", (e) => {
                d3.select(e.target).style("opacity", 1);
                d3.select(tooltip.current)
                    .selectAll("*").remove();
            })

    }, [chartData])

    // Return the SVG element.
    return (

        <svg ref={chart} width={width} height={height}>
            <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
            <g ref={gy} transform={`translate(${marginLeft},0)`} />
            <g ref={rects} fill="steelblue">
                {/* {chartData.map(e => (<rect key={e.cq} x={x(e.cq)} y={y(e.value)} height={y(0) - y(e.value)} width={x.bandwidth()} />))} */}
            </g>
            <g ref={tooltip} transform={`translate(${width - 70},20)`} />
        </svg>
    )
}
