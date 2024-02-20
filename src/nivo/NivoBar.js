import React from 'react';
import { line, curveCatmullRom } from "d3-shape";
import { ResponsiveBar } from '@nivo/bar'
import { handleCaptrue } from "utils/Capture";

const ScatterCircle = ({ bars, xScale, yScale }) => {
    return (
        <>
            {bars.map((bar) => (
                // Render the circle SVG in chart using Bars co-ordinates.
                <circle
                    key={`point-${bar.data.data.x}`}
                    // Scale x-cordinate of the circle to the center of bar
                    cx={xScale(bar.data.index) + bar.width / 2}
                    // Scale y-cordinate of the circle to top of the bar
                    cy={yScale(bar.data.data.v + 0.2)}
                    r={3}
                    fill="blue"
                    stroke="blue"
                    style={{ pointerEvents: "none" }}
                    onMouseEnter={()=>{

                    }}
                />
            ))}
        </>
    );
};

const Text = ({ bars, xScale, yScale }) => {
    return (
        <>
            {bars.map((bar) => (
                // Render the circle SVG in chart using Bars co-ordinates.
                <text
                    key={`point-${bar.data.data.x}`}
                    // Scale x-cordinate of the circle to the center of bar
                    x={xScale(bar.data.index) + bar.width / 2 - 16}
                    // Scale y-cordinate of the circle to top of the bar
                    y={yScale(bar.data.data.v + 0.2 + 0.6)}

                    stroke="black"
                    style={{ pointerEvents: "none", fontSize: 16, fontWeight: 0 }}
                >{bar.data.data.v}</text>
            ))}
        </>
    );
};

const RedLine = ({ bars, xScale, yScale }) => {
    console.log(bars);

    const lineGenerator = line()
        .x((bar) => xScale(bar.data.index) + bar.width / 2)
        .y((bar) => yScale(bar.data.data.v + 0.2))
        .curve(curveCatmullRom.alpha(0.5));

    return (
        <path
            d={lineGenerator(bars)}
            fill="none"
            stroke="red"
            style={{ pointerEvents: "none", strokeWidth: "2" }}
        />
    );
};

const Line = ({ bars, xScale, yScale }) => {
    const lineGenerator = line()
        .x((bar) => xScale(bar.data.index) + bar.width / 2)
        .y((bar) => yScale(bar.data.data.v + 0.2))
        .curve(curveCatmullRom.alpha(0.5));

    return (
        <path
            d={lineGenerator(bars)}
            fill="none"
            stroke="#7ac8ff"
            style={{ pointerEvents: "none", strokeWidth: "2" }}
        />
    );
};

const NivoBar = () => {
    return (
        <>
            <div id="nivo_bar" style={{ height: 500, maxWidth: "100%" }}>
                <ResponsiveBar
                    data={bar_data}
                    keys={["v"]}
                    maxValue={20}
                    padding={0}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 36,
                        left: 36
                    }}
                    indexBy="x"
                    enableLabel={false}
                    colors={["transparent"]}
                    borderRadius={2}
                    axisLeft={{
                        tickValues: 7
                    }}
                    tooltip={(item)=>{
                        return(
                            <div>
                                <b>{item.value}</b>
                            </div>
                        )
                    }}
                    /* Add Line component to the layers. Line component will be placed on the component at last. */
                    layers={["grid", "axes", "bars", RedLine, Line, ScatterCircle, Text ]}
                />
            </div>
            <button onClick={() => handleCaptrue("nivo_bar")}>BUTTON</button>
        </>
    )
}

const bar_data = [
    { x: "0", v: 18.1 },
    { x: "1", v: 17.5 },
    { x: "2", v: 17.4 },
    { x: "3", v: 18.1 },
    { x: "4", v: 17.4 },
    { x: "5", v: 18.3 },
];

export default NivoBar;