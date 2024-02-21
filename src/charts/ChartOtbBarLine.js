import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";
import { colors } from "theme";

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
    const [isHover, setIsHover] = useState(false);
    const [scales, setScales] = useState(options.scales);
    const [datasets, setDatasets] = useState([
        mainDataset(low, high, datas, (low - min) / (max - min), (high - min) / (max - min)),
        lowDataset(low),
        highDataset(high),
        basicDataset(max),
    ]);

    const onClick = () => {
        if (isClick) setIsClick(false);
        else setIsClick(true);
    };
    const onMouseEnter = () => {
        setIsHover(true);
    };
    const onMouseLeave = () => {
        setIsHover(false);
    };

    const borderWidth = () => {
        if (isHover) return 4;
        else return 2;
    };
    const lineBorderColor = (r, g, b) => {
        return () => {
            if (isHover) return `rgba(${r}, ${g}, ${b}, .18)`;
            else return `rgba(${r}, ${g}, ${b}, 1)`;
        }
    };

    // plugins.tooltip.callbacks
    const borderColor = (data) => {
        try {
            return low <= data.tooltipItems[0].parsed.y && data.tooltipItems[0].parsed.y <= high ? colors.SEA_GREEN : data.tooltipItems[0].parsed.y > high ? 'red' : 'blue';
        } catch (err) {
            return 'transparent';
        }
    };
    const backgroundColor = (data) => {
        try {
            return low <= data.tooltipItems[0].parsed.y && data.tooltipItems[0].parsed.y <= high ? 'rgb(186, 225, 200)' : data.tooltipItems[0].parsed.y > high ? 'rgb(245, 184, 187)' : 'rgb(181, 208, 251)';
        } catch (err) {
            return 'transparent';
        }
    };
    const label = (data) => {
        if (data.dataset.kind === "main") {
            const state = low <= data.parsed.y && data.parsed.y <= high ? 'Normal': data.parsed.y > high ? 'Abnormal(CS)': 'Abnormal(NCS)';
            return ` Hemoglobin: ${data.parsed.y} g/dL (${state})`;
        }
        return null;
        // return data;
    };
    const afterBody = (data) => {
        const BASIC_MENT = `Site: Severans Hospital, Yonsei University Health System\nSubjectID: 01-001\nTest Date: 2022-01-25`;
        return BASIC_MENT + (
            isClick?
                `\n클릭하셨어요?${data[0].parsed.y}` :
                ''
        );
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

    useEffect(() => {
        let newDatasets = datasets.slice();
        newDatasets[0] = {...datasets[0], borderWidth}
        newDatasets[1] = {...datasets[1], borderColor: lineBorderColor(0, 0, 0)}
        newDatasets[2] = {...datasets[2], borderColor: lineBorderColor(255, 0, 0)}
        setDatasets(newDatasets);
    }, [isHover]);

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
                                ...options.plugins.tooltip,
                                borderColor,
                                backgroundColor,
                                callbacks: {
                                    ...options.plugins.tooltip.callbacks,
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
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
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
            ticks: {
                padding: 12,
                stepSize: 1,
                font: {
                    size: 16,
                    weight: 600,
                },
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
                padding: 8,
                stepSize: 1,
                font: {
                    size: 16,
                    weight: 600,
                },
            },
        },
    },
    events: ['mouseout', 'mousemove', 'click'],
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        datalabels: {
            display: (context) => {
                return 0;
            },
        },
        legend: {
            display: false
        },
        tooltip: {
            titleFont: {
                size: 16,
            },
            titleColor: 'black',
            bodyFont: {
                size: 15,
            },
            bodyColor: 'black',
            borderWidth: 3,
            callbacks: {
            },
        },
    },
};

const getGradient = (ctx, chartArea, gLow, gHigh) => {
    let gradient;
    if (!gradient) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

        const newGLow = gLow - 0.08 > 0? gLow - 0.08: 0;
        const newGHigh = gHigh + 0.08 > 1? 1: gHigh + 0.08;
        gradient.addColorStop(newGLow, '#5b73ff');
        gradient.addColorStop(gLow, colors.SAGE_GREEN);
        gradient.addColorStop(gHigh, colors.SAGE_GREEN);
        gradient.addColorStop(newGHigh, 'rgba(255, 120, 120, 1)');
    }

    return gradient;
}

const mainDataset = (low, high, data, gLow, gHigh, borderWidth) =>  {
    return {
        type: 'line',
        kind: 'main',
        data: data,

        // 배경

        // 선
        borderWidth,
        borderColor: (context) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
                // This case happens on initial chart load
                return;
            }
            return getGradient(ctx, chartArea, gLow, gHigh);
        },

        // 포인트
        pointRadius: 4,
        pointHoverRadius: 8,
        backgroundColor: (data) => {
            if (data.parsed && low <= data.parsed.y && data.parsed.y <= high) {
                return colors.SEA_GREEN;
            } else if (data.parsed && data.parsed.y > high) {
                return 'red';
            } else {
                return 'blue';
            }
        }, // point 색상
        // hoverBackgroundColor: '',

        // 포인트 border
        pointBorderWidth: 0,
        pointHoverBorderWidth: 4,
        pointBorderColor: 'white',
        pointHoverBorderColor: (data) => {
            if (data.parsed && low <= data.parsed.y && data.parsed.y <= high) {
                return 'rgb(186, 225, 200)';
            } else if (data.parsed && data.parsed.y > high) {
                return 'rgb(245, 184, 187)';
            } else {
                return 'rgb(181, 208, 251)';
            }
        },
        tension: 0.3,
    }
}

const basicDataset = (max) => {
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

const highDataset = (high = 10, borderColor) => {
    return {
        type: 'line',
        data: Array.from({ length: 16 }, () => high),

        borderColor,
        borderWidth: 1.6,
        borderDash: [6, 6],

        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 0,
        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
        animation: {
            duration: 0
        },
    }};

const lowDataset = (low = 0, borderColor) => {
    return {
        type: 'line',
        data: Array.from({ length: 16 }, () => low),

        borderColor,
        borderWidth: 1.6,
        borderDash: [6, 6],

        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBorderWidth: 0,

        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
        animation: {
            duration: 0
        },
    }
};

const styles = {
    backgroundColor: 'transparent'
};
