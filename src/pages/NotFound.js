import { Image, Row, Typography } from "antd";
import React from "react";
import { withNamespaces } from "react-i18next";

const NotFound = ({ t }) => {
  return (
    <div>
      <Row justify="center" span={20}>
        <Typography.Title style={{textAlign:'center'}}>{t("pageNotFound")}!</Typography.Title>
      </Row>
      <Row span={18} justify="center" >
        <Image width='20rem' height='20rem' src="https://i.pinimg.com/564x/a7/d5/9b/a7d59b4a542b273c11fc9c710a4814d0.jpg"/>
      </Row>
    </div>
  );
};

export default withNamespaces()(NotFound);
