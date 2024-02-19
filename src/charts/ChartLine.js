import React from 'react';
import "chart.js/auto";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { handleCaptrue } from "utils/Capture";

ChartJS.register(ChartDataLabels);

const ChartLine = () => {
    return (
        <>
            <div id="chart_line" style={{height: 500, width: "100%"}}>
                <Line options={options} data={data}/>
            </div>
            <button onClick={() => handleCaptrue("chart_line")}>BUTTON</button>
        </>
    )
}

const options = {
    maintainAspectRatio: false,
    layout: {
        padding: 20
    },
    scales: {
        x: {
            ticks: {
                padding: 0,
            },
        },
        y: {
            min: 0,
            max: 20,
            ticks: {
                padding: 0,
            }
        },
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        datalabels: {
            color: 'black',
            font: {
                size: 16,
                weight: 600,
            },
            clamp: true,
            clip: true,
            anchor: 'end',
            align: (data)=> {
                if (data.dataIndex === 0) {
                    return '0';
                } else if (data.dataIndex === 5) {
                    return '-160';
                } else {
                    return '-90';
                }
            },
            offset: 0,
            formatter: function (value, context){
                let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return result + 'kg'
            },
            display: function(context) {
                return 1
            }
        },
        tooltip: {
            callbacks: {
                footer: () => {
                    return "Hi"
                },
            }
        },
        legend: {
            display: false
        },
    },
}

const data =  {
    labels: ['0', '1', '2', '3', '4', '7'],
    datasets: [
        {
            data: [18.1, 17.5, 17.4, 18.1, 17.4, 18.3],
            borderColor: '#48a4ff',
            borderWidth: 2,
            pointRadius: 6,
            backgroundColor: 'blue',
            pointBorderColor: 'blue',
            // pointHoverBackgroundColor: 'red',
            // pointHoverBorderColor: 'red',
            tension: 0.3,
        },
        {
            data: [17.1, 17.1, 17.1, 17.1, 17.1, 17.1],
            borderColor: 'red',
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 6,
            pointBorderWidth: 2,
            backgroundColor:  'red',
            pointBorderColor: 'black',
            datalabels: {
                color: 'transparent',
                backgroundColor: 'transparent',
            },
            tension: 0.3,
        },
    ],
};

export default ChartLine;