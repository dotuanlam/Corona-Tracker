import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./linechart.scss";

const LineChart = ({ currentGlobal }) => {

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: "Line Chart",
    },
    xAxis: {
      categories:
        currentGlobal === null ? [] : Object.keys(currentGlobal.cases),
      labels: {
        rotation: 290,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    series: [
      {
        name: "Confirmed",
        data: currentGlobal === null ? [] : Object.values(currentGlobal.cases),
        color: "red",
      },
      {
        name: "Deaths",
        data: currentGlobal === null ? [] : Object.values(currentGlobal.deaths),
        color: '#111'
      },
      {
        name: "Recovered",
        data:
          currentGlobal === null ? [] : Object.values(currentGlobal.recovered),
        color: 'green'
      },
    ],
  };
  return (
    <div className="container__home--linechart">
      <HighchartsReact options={options} highcharts={Highcharts} />
    </div>
  );
};

export default LineChart;
