import { useState, useEffect } from 'react';
import Chart from './Chart.jsx';
import './App.css'

function App() {
  const [dataAL30D, setDataAL30D] = useState(null);
  const [dataAL29D, setDataAL29D] = useState(null);
  const [dataAE38D, setDataAE38D] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData('http://localhost:1880/AL30D', setDataAL30D);
    fetchData('http://localhost:1880/AL29D', setDataAL29D);
    fetchData('http://localhost:1880/AE38D', setDataAE38D);
  }, []);

  return (
    <div>
      <h1 className="titulo-bonos">BONOS ARGENTINOS</h1>
    <div className="grid-container">
      <div className="chart-bonos">
        <h2>AL30D</h2>
        {dataAL30D && <Chart data={dataAL30D} nameBond='AL30D' />}
      </div>
      <div className="chart-bonos">
        <h2>AL29D</h2>
        {dataAL29D && <Chart data={dataAL29D} nameBond='AL29D' />}
      </div>
      <div className="chart-bonos">
        <h2>AE38D</h2>
        {dataAE38D && <Chart data={dataAE38D} nameBond='AE38D' />}
      </div>
    </div>
    </div>
  );
}

export default App;
