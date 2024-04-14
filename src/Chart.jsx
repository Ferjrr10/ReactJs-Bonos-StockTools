import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts/highstock';
import './Chart.css';
import StockTools from 'highcharts/modules/stock-tools';
import Annotations from 'highcharts/modules/annotations';
import 'highcharts/modules/full-screen';
import Exporting from 'highcharts/modules/exporting';
import DragPanes from 'highcharts/modules/drag-panes';
import PriceIndicator from 'highcharts/modules/price-indicator';
import HeikinAshi from 'highcharts/modules/heikinashi';
import HollowCandlestick from 'highcharts/modules/hollowcandlestick';


// Initialize the stock tools module
StockTools(Highcharts);
Annotations(Highcharts);
Exporting(Highcharts);
DragPanes(Highcharts);
PriceIndicator(Highcharts);
HeikinAshi(Highcharts);
HollowCandlestick(Highcharts);


function Chart({ data, nameBond }) {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (!data) return;

    const ohlc = [];
    const volume = [];
    const dataLength = data.length;

    for (let i = 0; i < dataLength; i += 1) {
      ohlc.push([
        data[i][0],
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
      ]);

      volume.push([data[i][0], data[i][5]]);
    }

    Highcharts.stockChart(chartContainer.current, {
      chart: {
        backgroundColor: '#050812',
        toolbar: true,
        panning: true,
        panKey: 'shift',
      },
      xAxis: {
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
      },
      yAxis: [
        {
          labels: {
            align: 'left',
            style: { color: '#FFFFFF' },
          },
          height: '80%',
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'left',
            style: { color: '#FFFFFF' },
          },
          top: '80%',
          height: '20%',
          offset: 0,
        },
      ],
      tooltip: {
        borderColor: 'red',
        shape: 'square',
        headerShape: 'callout',
        borderWidth: 0,
        shadow: true,
        positioner: function (width, height, point) {
          const chart = this.chart;
          let position;

          if (point.isHeader) {
            position = {
              x: Math.max(
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
                  chart.chartWidth - width - chart.marginRight
                )
              ),
              y: point.plotY,
            };
          } else {
            position = {
              x: point.series.chart.plotLeft,
              y: point.series.yAxis.top - chart.plotTop,
            };
          }

          return position;
        },
      },
      plotOptions: {
        series: {
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'ohlc',
          id: 'aapl-ohlc',
          name: nameBond,
          data: ohlc,
        },
        {
          type: 'column',
          id: 'aapl-volume',
          name: nameBond,
          data: volume,
          yAxis: 1,
        },
       
      ],
      stockTools: {
        gui: {
          enabled: true,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: true,
              },
            },
          },
        ],
      },
    });
  }, [data]);

  return <div ref={chartContainer} id="container" />;
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
};

export default Chart;

