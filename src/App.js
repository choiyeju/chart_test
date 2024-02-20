import './App.css';
import ChartBar from "charts/ChartBar";
import ChartLine from "charts/ChartLine";
import NivoBar from "nivo/NivoBar";
import NivoLine from "nivo/NivoLine";

function App() {
  return (
    <div className="App">
        <ChartBar/>
        <ChartLine/>
        <NivoBar/>
        <NivoLine/>
    </div>
  );
}

export default App;
