import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = ({ currentCountry }) => {


    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: "Line Chart",
        },
        xAxis: {
            categories: currentCountry && Object.keys(currentCountry?.timeline?.cases),
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
                data: currentCountry && Object.values(currentCountry?.timeline?.cases),
                color: "red",
            },
            {
                name: "Deaths",
                data: currentCountry && Object.values(currentCountry?.timeline?.deaths),
                color: '#111'
            },
            {
                name: "Recovered",
                data: currentCountry && Object.values(currentCountry?.timeline?.recovered),
                color: 'green'
            },
        ],
    };
    return (
        <div className="container__country-detail--linechart">
            <HighchartsReact options={options} highcharts={Highcharts} />
        </div>
    );
};

export default LineChart;