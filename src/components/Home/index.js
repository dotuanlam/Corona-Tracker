import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import Table from "./table";
import LineChart from "./Linechart/linechart";
import CountrySelector from "../Country/CountrySelector";
import Numeral from "numeral";
import "./index.scss";
import ColumnChart from "./ColumnChart";

const Home = ({ t }) => {
  const theme = useSelector((state) => state.theme.theme);
  const [global, setGlobal] = useState({
    confirmed: 0,
    recovered: 0,
    deaths: 0,
  });
  const [country, setCountry] = useState(null);
  const [currentGlobal, setCurrentGlobal] = useState(null)
  const [token, setToken] = useState(false)

  const getGlobalCovid = () => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((res) => {
        const { cases, deaths, recovered } = res
        setGlobal({
          confirmed: cases,
          deaths: deaths,
          recovered: recovered,
        });
      });
  };
  const getCountry = () => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((res) => {
        setCountry(res);
      });
  };

  const getCurrentGlobalInfo = () => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => res.json())
      .then((res) => {
        setCurrentGlobal(res);
      });
  };

  useEffect(() => {
    getGlobalCovid();
    getCountry();
    getCurrentGlobalInfo()
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [localStorage.getItem("token")])


  return (
    <div
      className={
        theme === "light" ? "container__home--light" : "container__home--dark"
      }
    >
      <div className="container__home--site-card-wrapper">
        <Row justify="center" align="middle" span={24} gutter={[20, 10]}>

          <Col style={{ margin: '0 auto' }}>
            <Typography.Title
              style={{
                marginLeft: "2rem",
                color: theme === "light" ? "#111" : "#eee",
                marginTop: '1rem', marginRight: '2rem'
              }}
            >
              {t("Global_information_covid19")}
            </Typography.Title>
          </Col>

          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Title
              level={4}
              style={{
                marginLeft: "2rem",
                color: theme === "light" ? "#111" : "#eee",
                marginTop: '1rem', marginRight: '2rem'
              }}
            >
              {t("Login_to_view_country")}
            </Typography.Title>
          </Col>

          {token === "true" ?
            <Col style={{ textAlign: 'center' }} span={24}>
              <CountrySelector country={country} />
            </Col>
            : null
          }

          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>

            <Col span={24}>
              <Row style={{ marginBottom: '2rem' }} gutter={[10, 10]} span={24}>

                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
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
                    <Card.Meta description={Numeral(global.confirmed).format("")} />
                  </Card>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
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
                    <Card.Meta description={Numeral(global.recovered).format("")} />
                  </Card>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
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
                    <Card.Meta description={Numeral(global.deaths).format("")} />
                  </Card>
                </Col>

              </Row>
            </Col>
            <ColumnChart country={country} />
          </Col>

          <Col style={{ marginTop: '5rem' }} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Table country={country} />
          </Col>

          <Col span={24}>
            <LineChart currentGlobal={currentGlobal} />
          </Col>

        </Row>

      </div>
    </div >
  );
};

export default withNamespaces()(Home);
