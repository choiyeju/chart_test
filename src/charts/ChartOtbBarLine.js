import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";

export const ChartOtbBarLine =
    ({
        text = { x: "Visit", y: "" },
        min = 0,
        max = 10,
        gap = 1,
        low,
        high,
        labels,
        datas
    }) => {

    const [isClick, setIsClick] = useState(false);
    const [scales, setScales] = useState(options.scales);
    const [datasets] = useState([ mainDataset(low, high, datas), lowDataset(low), highDataset(high), basicDataset(max)]);

    const onClick = () => {
        if (isClick) setIsClick(false);
        else setIsClick(true);
    };

    // plugins.tooltip.callbacks
    const label = (data) => {
        if (data.dataset.borderColor === '#48a4ff') {
            const state = low <= data.parsed.y && data.parsed.y <= high ? "Normal": data.parsed.y > high ? "Abnormal(CS)": "Abnormal(NCS)";
            return ` Hemoglobin: ${data.parsed.y} g/dL (${state})`;
        }
        return null;
        // return data;
    };
    const afterBody = (data) => {
        return isClick? data[0].parsed.y : "";
    };

    useEffect(() => {
        let newScales = JSON.parse(JSON.stringify(scales));
        newScales.x.title.text = text.x;
        newScales.y.title.text = text.y;
        newScales.y.min = min;
        newScales.y.max = max;
        newScales.y.ticks.stepSize = gap;
        setScales(newScales);
    }, []);

    return (
        <>
            <div id="chart_bar" style={{height: 500, width: "100%"}}>
                <Bar
                    options={{
                        ...options,
                        onClick,
                        scales,
                        plugins: {
                            ...options.plugins,
                            tooltip: {
                                callbacks: {
                                    label,
                                    afterBody,
                                },
                            },
                        }
                    }}
                    data={{
                        labels: labels,
                        datasets: datasets,
                    }}
                    style={styles}
                />
            </div>
            <button onClick={() => handleCaptrue("chart_bar")}>BUTTON</button>
        </>
    )
}

let options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                font: {
                    size: 16,
                    weight: 600,
                },
                color: 'black',
                display: true,
            },
            grid: {
                lineWidth: 0
            },
        },
        y: {
            min: 12,
            max: 18,
            title: {
                font: {
                    size: 16,
                    weight: 600,
                },
                color: 'black',
                display: true,
            },
            ticks: {
                stepSize: 1,
            }
        },
    },
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        datalabels: {
            display: function(context) {
                return 0;
            }
        },
        legend: {
            display: false
        },
    },
};

const basicDataset = max => {
    return {
        barPercentage: 1,
        categoryPercentage: 1,
        data: Array.from({ length: 16 }, () => max),
        backgroundColor: 'transparent',
        hoverBackgroundColor: 'rgba(0, 0, 0, .1)',
        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
    }
};

const highDataset = (high = 10) => {
    return {
        type: 'line',
        data: Array.from({ length: 16 }, () => high),
        borderColor: 'red',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 0,
        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
    }};

const lowDataset = (low = 0) => {
    return {
        type: 'line',
        data: Array.from({ length: 16 }, () => low),
        borderColor: 'black',
        borderWidth: 1,
        hoverBorderColor: 'red',
        borderDash: [4, 4],
        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 0,
        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
    }
};

const mainDataset = (low, high, data) =>  {
    return {
        type: 'line',
        data: data,
        borderColor: 'green',
        borderWidth: 2,
        pointRadius: 5,
        backgroundColor: (data) => {
            if (data.parsed && low <= data.parsed.y && data.parsed.y <= high) {
                return 'green';
            } else if (data.parsed && data.parsed.y > high) {
                return 'red';
            } else {
                return 'blue';
            }
        },
        pointBorderColor: (data) => {
            if (data.parsed && low <= data.parsed.y && data.parsed.y <= high) {
                return 'green';
            } else if (data.parsed && data.parsed.y > high) {
                return 'red';
            } else {
                return 'blue';
            }
        },
        pointHoverRadius: 8,
        tension: 0.3,
    }
}


const styles = {
    backgroundColor: 'transparent'
};
