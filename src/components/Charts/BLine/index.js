import React, {useEffect, useState} from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';

export const BLine =
    ({
        text,
        min,
        max,
        gap,

        labels,
        datas,
        elements,
    }) => {

    const [isHover, setIsHover] = useState(false);
    const [scales, setScales] = useState(options.scales);
    const [datasets, setDatasets] = useState([
        mainDataset(datas[0], elements[0]),
        sideDataset(datas[1], elements[1]),
        basicDataset(max),
    ]);

    const onMouseEnter = () => {
        setIsHover(true);
    };
    const onMouseLeave = () => {
        setIsHover(false);
    };

    const lineBorderWidth = (index) => {
        return () => {
            if (isHover) return elements[index].borderWidth + 2;
            else return elements[index].borderWidth;
        };
    };
    const lineBorderColor = (rgb) => {
        return () => {
            if (isHover) return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, .18)`;
            else return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
        }
    };

    // plugins.tooltip.callbacks
    const borderColor = () => {
        return elements[0].pointBackgroundColor;
    };
    const label = (data) => {
        if (data.dataset.kind === "main") {
            return ` Body weight: ${data.parsed.y} g`;
        }
        return null;
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

        for (let i = 0; i < newDatasets.length - 1; i++) {
            const dataset = newDatasets[i];
            if (dataset.kind === 'main') {
                newDatasets[i] = {
                    ...datasets[i],
                    borderWidth: lineBorderWidth(0),
                };
            } else if (dataset.kind === 'side') {
                newDatasets[i] = {
                    ...datasets[i],
                    borderColor: lineBorderColor(elements[1].borderColor.match(/\d+/g)),
                    pointBackgroundColor: lineBorderColor(elements[1].pointBackgroundColor.match(/\d+/g)),
                    pointBorderColor: lineBorderColor(elements[1].pointBorderColor.match(/\d+/g)),
                };
            }
        }
        setDatasets(newDatasets);
    }, [isHover]);

    return (
        <div id="chart_bar" style={{height: 600, width: "100%"}}>
            <Bar
                options={{
                    ...options,
                    scales,
                    plugins: {
                        ...options.plugins,
                        tooltip: {
                            ...options.plugins.tooltip,
                            borderColor,
                            callbacks: {
                                ...options.plugins.tooltip.callbacks,
                                label,
                            },
                        },
                    },
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
            color: 'rgb(255, 255, 255)',
            font: {
                size: 14,
                weight: 600,
            },
            borderWidth: (data) => {
                if (data.dataset.kind === 'main') return 3;
            },
            borderRadius: 50,
            borderColor: 'rgb(80, 80, 80)',
            backgroundColor: 'rgb(80, 80, 80)',
            clamp: true,
            clip: true,
            anchor: 'end',
            align: '-90',
            offset: 4,
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
            borderColor: 'black',
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

const mainDataset = (data, element) =>  {
    return {
        type: 'line',
        data,

        ...element,
        pointHoverBackgroundColor: element.pointBackgroundColor,
        pointHoverRadius: element.pointRadius + 3.5,

        tension: 0.3,
    }
}

const sideDataset = (data, element) => {
    return {
        type: 'line',
        data,

        ...element,
        pointHoverBorderWidth: element.pointBorderWidth,

        borderDash: [6, 6],
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

const styles = {
    backgroundColor: 'transparent'
};
