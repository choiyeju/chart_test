const ChartBar = () => {
    return (
        <div>Test</div>
    );
}

export default ChartBar;

// import React, { useState } from 'react';
// import "chart.js/auto";
// import { Chart as ChartJS } from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Bar } from 'react-chartjs-2';
// import { onCaptrue } from "../hooks/Capture";
//
// ChartJS.register(ChartDataLabels);
//
// const ChartBar = () => {
//     const [datasets, setDatasets] = useState([...data, ...avgData]);
//     const handleAvgButton = () => {
//         if (datasets.length > 2) setDatasets(data);
//         else setDatasets([...data, ...avgData]);
//     }
//
//     return (
//         <>
//             <div id="chart_bar" style={{height: 500, width: "100%"}}>
//                 <Bar options={options} data={{
//                     labels: labels,
//                     datasets: datasets,
//                 }} style={styles}/>
//             </div>
//             <button onClick={() => onCaptrue("chart_bar")}>BUTTON</button>
//             <button onClick={handleAvgButton}>AVG BUTTON</button>
//         </>
//     )
// }
//
// const options = {
//     maintainAspectRatio: false,
//     scales: {
//         x: {
//             title: {
//                 font: {
//                     size: 16,
//                     weight: 600,
//                 },
//                 color: 'black',
//                 display: true,
//                 text: 'Days of treatment'
//             },
//             // display: false,
//             ticks: {
//                 padding: 0,
//             },
//             grid: {
//                 lineWidth: 0
//             },
//         },
//         y: {
//             min: 0,
//             max: 20,
//             title: {
//                 font: {
//                     size: 16,
//                     weight: 600,
//                 },
//                 color: 'black',
//                 display: true,
//                 text: 'Body Weight (g)'
//             },
//             // display: false,
//             ticks: {
//                 padding: 0,
//             },
//             grid: {
//                 // lineWidth: 0
//             },
//         },
//     },
//     interaction: {
//         intersect: false,
//         mode: 'index',
//     },
//     plugins: {
//         datalabels: {
//             color: 'black',
//             font: {
//                 size: 16,
//                 weight: 600,
//             },
//             clamp: true,
//             clip: true,
//             anchor: 'end',
//             align: '-90',
//             offset: 0,
//             formatter: function (value, context){
//                 let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//                 return result + ''
//             },
//             display: function(context) {
//                 return 1;
//             }
//         },
//         tooltip: {
//             callbacks: {
//                 title: () => {
//                     // return 'Title';
//                 },
//                 label: (data) => {
//                     if (data.dataset.backgroundColor === 'blue' || data.dataset.backgroundColor === 'red') return data.parsed.y;
//                     return null;
//                 },
//                 footer: () => {
//                     return null;
//                 },
//             }
//         },
//         legend: {
//             display: false
//         },
//     },
// }
//
// const labels = ['0', '1', '2', '3', '4', '7']
//
// const data =  [
//     {
//         type: 'line',
//         data: [18.1, 17.5, 17.4, 18.1, 17.4, 18.3],
//         borderColor: '#48a4ff',
//         borderWidth: 2,
//         pointRadius: 6,
//         backgroundColor: 'blue',
//         pointBorderColor: 'blue',
//         // pointHoverBackgroundColor: 'red',
//         // pointHoverBorderColor: 'red',
//         tension: 0.3,
//     },
//     {
//         barPercentage: 1,
//         categoryPercentage: 1,
//         data: [20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
//         pointRadius: 6,
//         backgroundColor: 'transparent',
//         hoverBackgroundColor: 'rgba(0, 0, 0, .1)',
//         datalabels: {
//             color: 'transparent',
//             backgroundColor: 'transparent',
//         },
//         tension: 0.3,
//     },
// ]
//
// const avgData = [{
//     type: 'line',
//     data: [17.1, 17.1, 17.1, 17.1, 17.1, 17.1],
//     borderColor: 'red',
//     borderWidth: 1,
//     borderDash: [4, 4],
//     pointRadius: 6,
//     pointBorderWidth: 2,
//     backgroundColor:  'red',
//     pointBorderColor: 'black',
//     datalabels: {
//         color: 'transparent',
//         backgroundColor: 'transparent',
//     },
//     tension: 0.3,
// }]
//
// const styles = {
//     backgroundColor: 'transparent'
// }
//
// export default ChartBar;