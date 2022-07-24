import { Typography, Row, Col, Card, Image, Empty, Tooltip } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CountrySelector from './CountrySelector'
import Numeral from "numeral";
import { t } from 'i18next'
import LineChart from './Linechart';
import ColumnChart from './ColumnChart';
import { useSelector } from "react-redux";
import "./index.scss"


const CountryDetail = () => {
    const theme = useSelector((state) => state.theme.theme);
    console.log("🚀 ~ file: CountryDetail.js ~ line 15 ~ CountryDetail ~ theme", theme)
    const params = useParams()
    const [country, setCountry] = useState()
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [currentCountry, setCurrentCountry] = useState(null)

    const getCountry = () => {
        fetch(`https://disease.sh/v3/covid-19/countries/${params.country}`)
            .then(res => res.json())
            .then(res => {
                setSelectedCountry(res)
            })
    }
    const gethistoricalCountry = () => {
        fetch(`https://disease.sh/v3/covid-19/historical/${selectedCountry?.countryInfo?.iso2}?lastdays=all`)
            .then(res => res.json())
            .then(res => {
                setCurrentCountry(res)
            })
    }
    const getAllCountry = () => {
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(res => {
                setCountry(res)
            })
    }
    useEffect(() => {
        getCountry()
        getAllCountry()
    }, [params.country])
    useEffect(() => {
        gethistoricalCountry()
    }, [params.country, selectedCountry])
    const onConvertUTCTime = (epoch) => {
        var date = new Date(epoch);
        return date.toLocaleString();
    };
    return (
        <div className={theme === "light" ? "country-detail__light" : "country-detail__dark"}>
            <Row span={24} gutter={[20, 20]}>

                <Col style={{ textAlign: 'center', marginTop: '2rem' }} span={24}>
                    <CountrySelector country={country} />
                </Col>

                <Col style={{ display: 'flex', alignItems: 'flex-start' }} span={24}>
                    <Typography.Title style={{ marginLeft: '2rem', color: theme === "light" ? "#111" : "#fff" }} level={2}>{t("Country-detail-title")} {params.country}  </Typography.Title>
                    <Image style={{ width: '30px', height: '20px', marginTop: '10px', marginLeft: '10px' }} src={selectedCountry?.countryInfo?.flag} />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    {currentCountry?.timeline ? <ColumnChart currentCountry={currentCountry} /> : <Empty />}
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>

                    <Row span={24} gutter={[10, 10]}>
                        <Col span={8}>
                            <Tooltip title={t("Home_confirmed") + ": " + Numeral(selectedCountry?.cases || "0").format()}>
                                <Card
                                    hoverable={true}
                                    title={t("Home_confirmed")}
                                    headStyle={{
                                        backgroundColor: "rgb(255 0 0 / 20%)",
                                        border: 0,
                                        color: "rgb(255 0 0 / 100%)",
                                    }}
                                    bodyStyle={{
                                        backgroundColor: "rgb(255 0 0 / 5%)",
                                        border: 0,
                                    }}
                                >
                                    <Card.Meta description={Numeral(selectedCountry?.cases).format()} />
                                </Card>
                            </Tooltip>
                        </Col>
                        <Col span={8}>
                            <Tooltip title={t("Home_recovered") + ": " + Numeral(selectedCountry?.recovered || "0").format()}>
                                <Card
                                    hoverable={true}
                                    title={t("Home_recovered")}
                                    headStyle={{
                                        backgroundColor: "rgb(198 246 213)",
                                        color: "green",
                                        border: 0,
                                    }}
                                    bodyStyle={{
                                        backgroundColor: "rgb(198 246 213 / 9%)",
                                        border: 0,
                                    }}
                                >
                                    <Card.Meta description={Numeral(selectedCountry?.recovered || "0").format()} />
                                </Card>
                            </Tooltip>
                        </Col>
                        <Col span={8}>
                            <Tooltip title={t("Home_deaths") + ": " + Numeral(selectedCountry?.deaths || "0").format()}>
                                <Card
                                    hoverable={true}
                                    title={t("Home_deaths")}
                                    headStyle={{
                                        backgroundColor: "rgb(226,232,240)",
                                        border: 0,
                                    }}
                                    bodyStyle={{
                                        backgroundColor: "rgb(226 232 240 / 20%)",
                                        border: 0,
                                    }}
                                >
                                    <Card.Meta description={Numeral(selectedCountry?.deaths || "0").format()} />
                                </Card>
                            </Tooltip>
                        </Col>
                    </Row>

                    <Typography.Title style={{ display: 'flex', color: theme === "light" ? "#111" : "#fff" }} level={4}> {t("Country_detail_population")}:
                        <Typography.Title style={{ color: 'rgb(16,136,133)', marginLeft: '5px' }} level={4}> {Numeral(selectedCountry?.population).format()}</Typography.Title>
                    </Typography.Title>

                    <Typography.Title style={{ display: 'flex', color: theme === "light" ? "#111" : "#fff" }} level={4}>{t("Country_detail_continent")}:
                        <Typography.Title style={{ color: 'rgb(16,136,133)', marginLeft: '5px' }} level={4}> {selectedCountry?.continent}</Typography.Title>
                    </Typography.Title>

                    <Typography.Title style={{ display: 'flex', color: theme === "light" ? "#111" : "#fff" }} level={4}>{t("Country_detail_tests")}:
                        <Typography.Title style={{ color: 'rgb(16,136,133)', marginLeft: '5px' }} level={4}> {Numeral(selectedCountry?.tests).format()}</Typography.Title>
                    </Typography.Title>

                    <Typography.Title style={{ display: 'flex', color: theme === "light" ? "#111" : "#fff" }} level={4}>{t("Country_detail_updated")}:
                        <Typography.Title style={{ color: 'rgb(16,136,133)', marginLeft: '5px' }} level={4}> {
                            onConvertUTCTime(selectedCountry?.updated)
                        }</Typography.Title>
                    </Typography.Title>

                </Col>

                <Col span={24}>
                    {currentCountry?.timeline ? <LineChart currentCountry={currentCountry} /> : <Empty />}
                </Col>

            </Row >
        </div >
    )
}

export default CountryDetail