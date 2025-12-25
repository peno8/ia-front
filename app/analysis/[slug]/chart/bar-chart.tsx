import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Select } from "@mantine/core";
import { FeatureDef, getFeatureDef } from "@/app/screener/screener-store";
import { formatNumber, formatPercent, formatNumber2 } from "@/app/utils";
import { FeatureObj } from "../../api/route";

export default function BarChartContainer({
  featureDef,
  data,
  variationLabels,
  category,
}: {
  featureDef: FeatureDef;
  data: FeatureObj[];
  variationLabels: { value: string; label: string }[];
  category: string;
}) {
  const [key, setKey] = useState(variationLabels[0].value);

  console.log(featureDef);
  console.log(data);
  console.log(variationLabels);
  const maybeChartData = data.find((e) => e.fName === key)?.features;
  const chartData = maybeChartData ? maybeChartData : [];

  function changeChartData(key: string | null) {
    key && setKey(() => key);
  }

  return (
    <div className="mb-2 flex flex-row">
      <div className="flex flex-col items-left w-48">
        <div className="mr-2">{featureDef.desc}</div>
        <Select
          // variant="unstyled"
          size="xs"
          radius="xs"
          // placeholder="Select Feature"
          data={variationLabels}
          defaultValue={variationLabels[0].value}
          onChange={changeChartData}
          className="w-37.5"
        />
      </div>
      <BarChart
        chartData={chartData}
        category={category}
        featureDef={featureDef}
      />
    </div>
  );
}

function getLabelNumString(featureType: string, value: number) {
  let prec = 1;
  let unit = "M";

  if (featureType === "MILLION") {
    if (value >= 10000000) {
      prec = 1000000;
      unit = "T";
    } else if (value >= 10000) {
      prec = 1000;
      unit = "B";
    } else {
      unit = "M";
    }
    return `${formatNumber2(value, prec)}${unit}`;
  } else if (featureType === "NOMINAL") {
    let prec = 1;
    let unit = "";
    if (value >= 10000) {
      prec = 1000;
      unit = "K";
    }
    return `${formatNumber2(value, prec, 1)}${unit}`;
  } else if (featureType === "RATIO") {
    prec = 1;
    unit = "";
    return `${formatNumber2(value, prec, 1)}${unit}`;
  } else {
    return `${formatNumber2(value * 100, 1, 1)}%`;
  }
}

export function BarChart({
  chartData,
  category,
  featureDef,
}: {
  chartData: {
    value: number;
    cq: string;
    end: string;
  }[];
  category: string;
  featureDef: FeatureDef;
}) {
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

  let maybeMaxYaxisValue = d3.max(chartData, (d) => d.value);
  let maxYaxisValue = maybeMaxYaxisValue ? maybeMaxYaxisValue : 0;

  let maybeMinYaxisValue = d3.min(chartData, (d) => d.value);
  let minYaxisValue = maybeMinYaxisValue ? maybeMinYaxisValue : 0;
  if (minYaxisValue! > 0) minYaxisValue = 0;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleBand()
    .domain(chartData.map((e) => e.cq)) // descending frequency
    .range([width - marginRight, marginLeft])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([minYaxisValue!, d3.max(chartData, (d) => d.value)!])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  useEffect(() => {
    void d3.select(gx.current).call(
      // @ts-ignore
      d3
        .axisBottom(x)
        .tickValues(
          x.domain().filter((e) => {
            const arr = e.split("-");
            return parseInt(arr[0]) % 2 === 0 && arr[1] === "Q4";
          })
        )
        .tickFormat((d, i) => d.slice(0, 4))
        .tickSizeOuter(0)
    );
  }, [gx, x, chartData]);

  useEffect(() => {
    if (featureDef.featureType === "MILLION") {
      let prec = 1;
      let unit = "M";
      if (maxYaxisValue >= 10000000) {
        prec = 1000000;
        unit = "T";
      } else if (maxYaxisValue >= 10000) {
        prec = 1000;
        unit = "B";
      }

      d3.select(gy.current).call(
        // @ts-ignore
        d3
          .axisLeft(y)
          .ticks(5)
          // @ts-ignore
          .tickFormat((v) => `${formatNumber2(v, prec)}${unit}`)
      );
    } else if (featureDef.featureType === "NOMINAL") {
      let prec = 1;
      let unit = "";
      // console.log(featureDef)
      // console.log(chartData)
      if (maxYaxisValue >= 10000) {
        prec = 1000;
        unit = "K";
      }

      d3.select(gy.current).call(
        // @ts-ignore
        d3
          .axisLeft(y)
          .ticks(5)
          // @ts-ignore
          .tickFormat((v) => `${formatNumber2(v, 1)}${unit}`)
      );
    } else if (featureDef.featureType === "RATIO") {
      // @ts-ignore
      d3.select(gy.current).call(d3.axisLeft(y).ticks(5));
    } else {
      // @ts-ignore
      d3.select(gy.current).call(d3.axisLeft(y).ticks(5, "%"));
    }
  }, [gy, y, chartData]);

  useEffect(() => {
    d3.select(rects.current).selectAll("*").remove();

    d3.select(rects.current)
      .selectAll()
      .data(chartData)
      .join("rect")
      // @ts-ignore
      .attr("x", (d) => {
        return x(d.cq);
      })
      // .attr("y", d => { return y(d.value) })
      // .attr("height", d => { return y(minYaxisValue) - y(d.value) })
      .attr("y", (d) => {
        return d.value > 0 ? y(d.value) : y(0);
      })
      .attr("height", (d) => {
        return d.value > 0 ? y(0) - y(d.value) : y(d.value) - y(0);
      })
      .attr("width", () => {
        return x.bandwidth();
      })
      .attr("fill", (d) => (d.value < 0 ? "#F78C6C" : "steelblue"))
      .on("pointerenter", (e, d) => {
        d3.select(e.target).style("opacity", 0.5);
        d3.select(tooltip.current)
          .style("display", null)
          .attr("font-size", 11)
          .append("text")
          .datum(d)
          .attr("text-anchor", "middle")
          .text((d) => {
            {
              return `CQ: ${d.cq}, ${getLabelNumString(featureDef.featureType, d.value)}`;
            }
          })
          .attr("fill", "currentColor");
      })
      .on("pointerleave", (e) => {
        d3.select(e.target).style("opacity", 1);
        d3.select(tooltip.current).selectAll("*").remove();
      });
  }, [chartData]);

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
  );
}
