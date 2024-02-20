import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { handleCaptrue } from "utils/Capture";

const DashedSolidLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }, index) => (
        <path
            key={id}
            d={lineGenerator(
                data.map((d) => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y)
                }))
            )}
            fill="none"
            stroke={color}
            style={
                index % 2 === 1
                    ? {
                        // simulate line will dash stroke when index is even
                        strokeDasharray: "3, 6",
                        strokeWidth: 3
                    }
                    : {
                        // simulate line with solid stroke
                        strokeWidth: 2
                    }
            }
        />
    ));
};

const Text = ({ width, series, xScale, yScale }) => {
    return (
        series.map(({ id, data }) => (
            id === "one" &&
            data.map((data2, index2) => {
                return (
                    <text
                        key={index2}
                        x={xScale(index2-1) + (width/5) - 36}
                        y={yScale(data2.data.y + 0.8)}
                        fill="none"
                        stroke="#000"
                    >{data2.data.y}</text>
                );
            })
        ))

    );
};

const NivoLine = () => {
    const [lineData, setLineData] = useState([...line_data1, ...line_avg_data]);

    const handleAvgButton = () => {
        if (lineData.length > 1) {
            setLineData(line_data1);
        } else {
            setLineData([...line_data1, ...line_avg_data])
        }
    }

    return (
        <>
            <div id="nivo_line" style={{height: 500, maxWidth: "100%"}}>
                <ResponsiveLine
                    data={lineData}
                    margin={{top: 50, right: 60, bottom: 50, left: 60}}
                    colors={["#48a4ff", "red"]}
                    xScale={{type: 'point'}}
                    yScale={{
                        type: 'linear',
                        min: 0,
                        max: 20,
                        stacked: false,
                        reverse: false
                    }}
                    enableGridX={false}
                    yFormat=" >-.1f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Days of after',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Body Weight (g)',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    // gridYValues={[40, 100, 160, 220, 280]}
                    pointSize={12}
                    // pointBorderWidth={6}
                    // pointBorderColor="#000"
                    useMesh={true}
                    enableSlices="x"
                    layers={[
                        DashedSolidLine,
                        "grid",
                        "markers",
                        "axes",
                        "areas",
                        "crosshair",
                        // "lines",
                        "slices",
                        "points",
                        "mesh",
                        "legends",
                        Text,
                    ]}
                    legends={[]}
                />
            </div>
            <button onClick={() => handleCaptrue("nivo_line")}>BUTTON</button>
            <button onClick={handleAvgButton}>AVG BUTTON</button>
        </>
    )
}

const line_data1 =
    [
        {
            "id": "one",
            "color": "#000",
            "data": [
                // {
                //     "x": "",
                //     "y": null
                // },
                {
                    "x": "0",
                    "y": 18.1
                },
                {
                    "x": "1",
                    "y": 17.5
                },
                {
                    "x": "2",
                    "y": 17.4
                },
                {
                    "x": "3",
                    "y": 18.1
                },
                {
                    "x": "4",
                    "y": 17.4
                },
                {
                    "x": "7",
                    "y": 18.3
                },
                // {
                //     "x": "10",
                //     "y": null
                // },
            ]
        },
    ];

const line_avg_data = [
    {
        "id": "avg",
        "color": "#000",
        "data": [
            // {
            //     "x": "",
            //     "y": null
            // },
            {
                "x": "0",
                "y": 17.1
            },
            {
                "x": "1",
                "y": 17.1
            },
            {
                "x": "2",
                "y": 17.1
            },
            {
                "x": "3",
                "y": 17.1
            },
            {
                "x": "4",
                "y": 17.1
            },
            {
                "x": "7",
                "y": 17.1
            },
            // {
            //     "x": "10",
            //     "y": null
            // },
        ]
    },
];

export default NivoLine;