import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ chartUsers }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [series, setSeries] = useState([{ name: "Users", data: [] }]);
  // const [series, setSeries] = useState([
  //   {
  //     name: "Users",
  //     data: [],
  //   },
  // ]);

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
      categories: [
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
      ],
    },
  });

  useEffect(() => {
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

    if (chartUsers && Array.isArray(chartUsers)) {
      const filteredData = chartUsers.filter(
        (data) => data.year === selectedYear.toString()
      );

      filteredData.forEach((item) => {
        const monthKey = item.month.slice(0, 3);
        initialData[monthKey] = Number(item.count);
      });

      setSeries([{ name: "Users", data: Object.values(initialData) }]);
    }
  }, [chartUsers, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const years = Array.from(new Set(chartUsers?.map((item) => item.year)))?.sort();

  return (
    <div>
      <select value={selectedYear} onChange={handleYearChange}>
        {years?.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div id="chart" className="bg-white">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};
export default AreaChart;
