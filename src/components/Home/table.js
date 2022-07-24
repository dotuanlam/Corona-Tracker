import React from "react";
import { Table } from "antd";
import { withNamespaces } from "react-i18next";
const TableCountry = ({ t, country }) => {
  const countrydata = country;

  const columns = [
    {
      title: t("Home_Table_National flag"),
      width: 10,
      dataIndex: "National_flag",
      key: "National_flag",
      render: (theImageURL) => (
        <img
          style={{ width: "50px", height: "33.333px" }}
          alt={theImageURL}
          src={theImageURL}
        />
      ),
    },
    {
      title: t("Home_Table_Country"),
      width: 15,
      dataIndex: "country",
      key: "country",
    },
    {
      title: t("Home_Table_confirmed"),
      width: 10,
      dataIndex: "confirmed",
      key: "confirmed",
      sorter: (a, b) => a.confirmed - b.confirmed,
    },
    {
      title: t("Home_Table_recovered"),
      dataIndex: "recovered",
      key: "recovered",
      width: 10,
      sorter: (a, b) => a.recovered - b.recovered,
    },
    {
      title: t("Home_Table_deaths"),
      dataIndex: "deaths",
      key: "deaths",
      width: 10,
      sorter: (a, b) => a.deaths - b.deaths,
    },
  ];
  const data = [];

  countrydata?.map((item) =>
    data.push({
      National_flag: item.countryInfo.flag,
      country: item.country,
      confirmed: item.cases,
      recovered: item.recovered,
      deaths: item.deaths,
      theImageURL: item.countryInfo.flag,
    })
  );

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 700,
          y: 500,
        }}
      />
    </div>
  );
};

export default withNamespaces()(TableCountry);
