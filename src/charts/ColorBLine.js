import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";
import { colors } from "theme";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

export const ColorBLine =
    ({
         text = { x: "Visit", y: "" },
         min = 0,
         max = 10,
         gap = 1,
         labels,
         datas
    }) => {

    const [isClick, setIsClick] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [scales, setScales] = useState(options.scales);
    const [datasets, setDatasets] = useState([
        mainDataset(datas),
        dummyDataset(),
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

    // plugins.tooltip.callbacks
    const label = (data) => {
        if (data.dataset.kind === "main") {
            return ` Does (mg): ${data.parsed.y} mg`;
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
        setDatasets(newDatasets);
    }, [isHover]);

    return (
        <>
            <div id="color_b_line" style={{height: 500, width: "100%"}}>
                <Bar
                    options={{
                        ...options,
                        onClick,
                        scales,
                        plugins: {
                            ...options.plugins,
                            tooltip: {
                                ...options.plugins.tooltip,
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
    bezierCurve: false,
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
        beforeRender: function(c, options) {
            var dataset = c.data.datasets[0];
            var yScale = c.scales['y-axis-0'];
            var yPos = yScale.getPixelForValue(0);

            var gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
            gradientFill.addColorStop(0, 'red');
            gradientFill.addColorStop(yPos / c.height - 0.01, 'red');
            gradientFill.addColorStop(yPos / c.height + 0.01, 'blue');
            gradientFill.addColorStop(1, 'blue');

            var model = c.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].$filler.el._model;
            model.backgroundColor = gradientFill;
        },
        datalabels: {
            color: 'black',
            font: {
                size: 16,
                weight: 600,
            },
            clamp: true,
            clip: true,
            anchor: 'end',
            align: '-90',
            offset: 0,
            formatter: function (value, context){
                if (0 < context.dataIndex && context.dataIndex < context.dataset.data.length) {
                    if (context.dataset.data[context.dataIndex - 1] !== value) {
                        return context.dataset.data[context.dataIndex - 1] + ' to ' + value + 'mg';
                    }
                }
                return value + ' mg'
            },
            display: function(context) {
                return 1;
            }
        },
        legend: {
            display: false
        },
        tooltip: {
            borderColor: 'rgb(124, 181, 236)',
            backgroundColor: 'white',
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

const mainDataset = (data, borderWidth) =>  {
    return {
        type: 'line',
        kind: 'main',
        data: data,

        // 배경
        fill: 'start',
        backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 500);
            gradient.addColorStop(0, "rgba(124, 181, 236, .6)");
            gradient.addColorStop(1, "rgba(124, 181, 236, 0)");
            return gradient;
        },

        // 선
        borderWidth,
        borderColor: 'rgb(124, 181, 236)',

        // 포인트
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(124, 181, 236)',
        pointHoverBackgroundColor: 'rgb(124, 181, 236)',

        // 포인트 border
        pointBorderWidth: 0,
        pointHoverBorderWidth: 4,
        pointBorderColor: 'white',
        pointHoverBorderColor: 'rgb(197, 217, 240)',
        tension: 0,
    }
}

const basicDataset = (max) => {
    return {
        barPercentage: 1,
        categoryPercentage: 1,
        data: Array.from({ length: 17 }, () => max),
        backgroundColor: 'transparent',
        hoverBackgroundColor: 'rgba(0, 0, 0, .1)',
        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
    }
};

const dummyDataset = () => {
    return {
        type: 'line',
        data: Array.from({ length: 17 }, () => null),
    }};

const styles = {
    backgroundColor: 'transparent'
};
