// src/components/admin/BarChart.jsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const BarChart = ({ chartData, title }) => {
  const options = {
    indexAxis: 'y', // this makes the bar chart horizontal
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // hide the legend for a cleaner look
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        }
      },
    },
    scales: {
        x: {
            grid: {
                display: false, // hide the x-axis grid lines
            }
        },
        y: {
            grid: {
                display: false, // hide the y-axis grid lines
            }
        }
    }
  };

  const data = {
    labels: chartData.map(d => d.label),
    datasets: [
      {
        label: 'Count',
        data: chartData.map(d => d.value),
        borderColor: '#3C3F7C',
        backgroundColor: '#5d60a7',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;