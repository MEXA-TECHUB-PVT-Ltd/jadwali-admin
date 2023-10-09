import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


const AreaChart = () => {
    const [series, setSeries] = React.useState([{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);

    const [options, setOptions] = React.useState({
        chart: {
            height: 350,
            type: 'area', 
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            colors: ['#6C309C']
        },
        fill: { 
            opacity: 0.9,
            colors: ['#C7AEDB']
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });

    return (
        <div id="chart" className=' bg-white'>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
}

export default AreaChart;
