import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ReportGraph = ({data}) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -100,
            to: -46,
            color: '#F15B46'
          }, {
            from: -45,
            to: 0,
            color: '#FEB019'
          }]
        },
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: 'Balanço',
      },
      labels: {
        formatter: function (value) {
          return `R$ ${value.toFixed(2)}`;
        },
      }
    },
    xaxis: {
      categories: ['Créditos', 'Despesas provisionadas', 'Despesas Pagas', 'Saldo']
    }
  }

  const series = [{
    name: 'Valor',
    data: data
  }];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default ReportGraph;
