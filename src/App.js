import './App.css';
import { useRoutes } from 'react-router-dom';

import routes from './routes';

import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

function App() {
    const routing = useRoutes(routes);

    return routing;
}

export default App;
