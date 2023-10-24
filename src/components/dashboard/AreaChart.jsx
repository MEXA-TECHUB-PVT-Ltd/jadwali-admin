import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AreaChart = ({ chartUsers }) => {
  const [series, setSeries] = useState([
    {
      name: "Users",
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#6C309C"],
    },
    fill: {
      opacity: 0.9,
      colors: ["#C7AEDB"],
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: monthOrder,
    },
  });

useEffect(() => {
  if (chartUsers && typeof chartUsers === "object") {
    console.log("chartUsers:", chartUsers); // Debug log

    const initialData = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    // Convert chartUsers keys to proper case
    const formattedChartUsers = {};
    Object.keys(chartUsers).forEach((key) => {
      const formattedKey =
        key.charAt(0).toUpperCase() + key.slice(1, 3).toLowerCase();
      formattedChartUsers[formattedKey] = chartUsers[key];
    });

    const updatedData = { ...initialData, ...formattedChartUsers };
    console.log("updatedData:", updatedData); // Debug log

    const sortedData = monthOrder.map((month) => Number(updatedData[month]));
    console.log("sortedData:", sortedData); // Debug log

    setSeries([{ name: "Users", data: sortedData }]);
  }
}, [chartUsers]);


  return (
    <div id="chart" className="bg-white">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
