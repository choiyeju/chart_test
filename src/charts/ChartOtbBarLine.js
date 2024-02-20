import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";

export const ChartOtbBarLine = ({ text, minMax, gap, lowHigh, labels, datas }) => {
    const [isClick, setIsClick] = useState(false);
    const [datasets] = useState([ mainDataset(lowHigh[0], lowHigh[1], datas), lowDataset(lowHigh[0]), highDataset(lowHigh[1]), basicDataset(minMax[1]) ]);

    const onClick = () => {
        if (isClick) setIsClick(false);
        else setIsClick(true);
    };

    const label = (data) => {
        if (data.dataset.borderColor === '#48a4ff') {
            const state = lowHigh[0] <= data.parsed.y && data.parsed.y <= lowHigh[1]? "Normal": data.parsed.y > lowHigh[1]? "Abnormal(CS)": "Abnormal(NCS)";
            return ` Hemoglobin: ${data.parsed.y} g/dL (${state})`;
        }
        return null;
        // return data;
    };
    const footer = (data) => {
        const footerVal = isClick? data[0].parsed.y : "";
        return footerVal;
    };

    return (
        <>
            <div id="chart_bar" style={{height: 500, width: "100%"}}>
                <Bar
                    options={{
                        ...options,
                        onClick,
                        scales: {
                            ...options.scales,
                            x: {
                                ...options.scales.x,
                                title: {
                                    ...options.scales.x.title,
                                    text: text.x,
                                },
                            },
                            y: {
                                ...options.scales.y,
                                min: minMax[0],
                                max: minMax[1],
                                title: {
                                    ...options.scales.y.title,
                                    text: text.y,
                                },
                                ticks: {
                                    ...options.ticks,
                                    stepSize: gap,
                                },
                            },
                        },
                        plugins: {
                            ...options.plugins,
                            tooltip: {
                                ...options.plugins.tooltip,
                                callbacks: {
                                    ...options.plugins.tooltip.callbacks,
                                    label,
                                    footer,
                                }
                            }
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
                text: 'Days of treatment'
            },
            // display: false,
            ticks: {
                padding: 0,
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
                text: 'Body Weight (g)'
            },
            // display: false,
            ticks: {
                padding: 0,
                stepSize: 2
            },
            grid: {
                // lineWidth: 0
            },
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
        tooltip: {
            callbacks: {
                title: () => {
                    // return 'Title';
                },
                // label: (data) => {
                //     if (data.dataset.borderColor === '#48a4ff') {
                //         const state = lowHigh[0] <= data.parsed.y && data.parsed.y <= lowHigh[1]? "Normal": "Abnormal(NCS)";
                //         return `Hemoglobin: ${data.parsed.y} g/dL (${state})`;
                //     }
                //     return null;
                //     // return data;
                // },
                // footer: () => {
                //     return "Hi";
                // },
            }
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
        borderColor: '#48a4ff',
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
