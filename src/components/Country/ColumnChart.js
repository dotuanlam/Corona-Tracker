import React, { useEffect, useState } from 'react'
import Highcharts, { uniqueKey } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Numeral } from 'numeral';
import { t } from "i18next"
import { useParams } from 'react-router';

const ColumnChart = ({ currentCountry }) => {
    const params = useParams()
    const [topCase, setTopCase] = useState(null)

    useEffect(() => {
        const a = currentCountry?.timeline?.cases
        let sortable = [];
        for (var vehicle in a) {
            sortable.push([vehicle, a[vehicle]]);
        }
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        setTopCase(sortable.splice(0, 10))
    }, [])

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: t("Country_detail_ColumnChart_title")
        },
        subtitle: {
            text: t("Country_detail_ColumnChart_subtitle") + " " + params.country
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -35,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Values'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Confirmed : <b>{point.y:.0f} </b>'
        },
        series: [{
            name: 'Population',
            data: topCase,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    }

    return (
        <div>
            <HighchartsReact options={options} highcharts={Highcharts} />
        </div>
    )
}

export default ColumnChart