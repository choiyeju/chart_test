import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";

export const BLine =
    ({
         text = { x: "Visit", y: "" },
         min = 0,
         max = 10,
         gap = 1,
         labels,
         datas,
         sideDatas,
    }) => {

    const [isClick, setIsClick] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [scales, setScales] = useState(options.scales);
    const [datasets, setDatasets] = useState([
        mainDataset(datas),
        sideDataset(sideDatas),
        basicDataset(max),
    ]);

    const handleAvgButton = () => {
        if (datasets.length > 2) {
            setDatasets([
                mainDataset(datas),
                basicDataset(max),
            ]);
        }
        else {
            setDatasets([
                mainDataset(datas),
                sideDataset(
                    sideDatas,
                    'red',
                    'red',
                    'black'
                ),
                basicDataset(max),
            ]);
        }
    }

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

    const lineBorderColor = (r, g, b) => {
        return () => {
            if (isHover) return `rgba(${r}, ${g}, ${b}, .18)`;
            else return `rgba(${r}, ${g}, ${b}, 1)`;
        }
    };

    // plugins.tooltip.callbacks
    const label = (data) => {
        if (data.dataset.kind === "main") {
            return ` Body weight: ${data.parsed.y} g`;
        }
        return null;
    };
    const afterBody = (data) => {
        // const BASIC_MENT = `Site: Severans Hospital, Yonsei University Health System\nSubjectID: 01-001\nTest Date: 2022-01-25`;
        const BASIC_MENT = ``;
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
        newDatasets[1] = {
            ...datasets[1],
            borderColor: lineBorderColor(255, 0, 0),
            pointBackgroundColor: lineBorderColor(255, 0, 0),
            pointBorderColor: lineBorderColor(0, 0, 0)
        };
        setDatasets(newDatasets);
    }, [isHover]);

    return (
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
            color: 'black',
            font: {
                size: 14,
                weight: 600,
            },
            borderWidth: (data) => {
                if (data.dataset.kind === 'main') return 1;
            },
            borderRadius: 8,
            borderColor: 'black',
            backgroundColor: 'rgba(255, 255, 0, .1)',
            clamp: true,
            clip: true,
            anchor: 'end',
            align: '-90',
            offset: 0,
            formatter: function (value, context){
                let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return result;
            },
            display: function(context) {
                return 1;
            },
        },
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false,
            borderColor: 'rgb(135, 206, 235)',
            backgroundColor: 'white',
            titleFont: {
                size: 16,
            },
            titleColor: 'black',
            bodyFont: {
                size: 15,
            },
            bodyColor: 'black',
            borderWidth: 2,
            callbacks: {
            },
        },
    },
};

const mainDataset = (data) =>  {
    return {
        type: 'line',
        kind: 'main',
        data,

        // 배경

        // 선
        borderWidth: 2,
        borderColor: 'rgb(135, 206, 235)',

        // 포인트
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: 'blue',

        // 포인트 border
        pointBorderWidth: 0,
        pointHoverBorderWidth: 4,
        pointBorderColor: 'white',
        pointHoverBorderColor: 'rgb(197, 217, 240)',
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

const sideDataset = (data, borderColor, pointBackgroundColor, pointBorderColor) => {
    return {
        type: 'line',
        data,

        borderColor,
        borderWidth: 1.6,
        borderDash: [6, 6],

        pointRadius: 4,
        pointHoverRadius: 4,
        pointBackgroundColor,

        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointBorderColor,

        datalabels: {
            color: 'transparent',
            backgroundColor: 'transparent',
        },
        tension: 0.3,
        animation: {
            duration: 0
        },
    }};

const styles = {
    backgroundColor: 'transparent'
};
