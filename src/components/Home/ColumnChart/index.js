import React, { useEffect, useState } from 'react'
import Highcharts, { uniqueKey } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { t } from "i18next"
import "./index.scss"

const ColumnChart = ({ country }) => {
  const [topCountry, setTopCountry] = useState(null)
  const [topCountryName, setTopCountryName] = useState(null)
  const [topConfirmed, seTopConfirmed] = useState(null)
  const [topDeath, setTopDeath] = useState(null)
  const [topRecovered, setTopRecovered] = useState(null)

  useEffect(() => {
    if (country !== null) {
      setTopCountry(country.sort((a, b) => { return b.cases - a.cases }).slice(0, 10))
    }

  }, [country])
  useEffect(() => {
    const a = []
    const b = []
    const c = []
    const d = []
    if (topCountry !== null) {
      topCountry.map(item => {
        a.push(item.cases)
        b.push(item.deaths)
        c.push(item.recovered)
        d.push(item.country)
      })
      setTopDeath(b)
      setTopRecovered(c)
      seTopConfirmed(a)
      setTopCountryName(d)
    }

  }, [topCountry])
  const options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: t("Column_chart_title")
    },
    xAxis: {
      categories: topCountryName
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: t("Home_confirmed"),
      data: topConfirmed
    }, {
      name: t("Home_deaths"),
      data: topDeath
    }, {
      name: t("Home_recovered"),
      data: topRecovered
    }]
  }

  return (
    <div>
      <div className="container__home--columnchart">
        <HighchartsReact options={options} highcharts={Highcharts} />
      </div>
    </div>
  )
}

export default ColumnChart