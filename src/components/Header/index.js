import React, { useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Typography,
  Menu,
  Select,
  Switch,
  Image,
} from "antd";
import { withNamespaces } from "react-i18next";
import {
  LoginOutlined,
  HomeFilled,
  MailFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/themeSlice";
const { Option } = Select;

const Header = (props) => {
  const dispath = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  console.log("🚀 ~ file: index.js ~ line 16 ~ Header ~ theme", theme);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("news");
  const t = props.t;
  const items = [
    {
      label: t("Header_Home"),
      key: t("Header_Home"),
      icon: <HomeFilled />,
    },
    {
      label: t("Header_News"),
      key: t("Header_News"),
      icon: <MailFilled />,
    },
    {
      label: t("Header_Analytics"),
      key: t("Header_Analytics"),
      icon: <InfoCircleOutlined />,
    },
    {
      label: t("Header_Login"),
      key: t("Header_Login"),
      icon: <LoginOutlined />,
    },
  ];
  const onClickMenuItem = (e) => {
    console.log("click ", e);
    navigate(`${e.key}`);
    setCurrent(e.key);
  };
  const handleChangeLanguage = (value) => {
    return props.changeLanguage(value.value);
  };
  const handleThemeChange = (value) => {
    const dark = { theme: "dark" };
    const light = { theme: "light" };
    if (value === true) {
      dispath(update(dark));
    } else {
      dispath(update(light));
    }
  };
  return (
    <div
      className={
        theme === "dark"
          ? "container__header--dark"
          : "container__header--light"
      }
    >
      <div className="container__header--menubar">
        <ion-icon name="menu-outline"></ion-icon>
      </div>
      <Row span={24} justify="space-between">
        <Col>
          <Row justify="center">
            <Avatar
              size={'2rem'}
              src="https://i.pinimg.com/564x/ac/d3/d4/acd3d4726909543116555bc6996ee5dc.jpg"
            />
            <Typography.Title
              level={3}
              style={{
                display: "flex",
                color: "#1aad90",
                marginLeft: "8px",
              }}
            >
              Corona
              <Typography.Title
                style={{ fontWeight: "800" }}
                level={3}
                type="danger"
              >
                Tracker
              </Typography.Title>
            </Typography.Title>
          </Row>
        </Col>
        <Col sm={24} md={18} lg={15} xl={13} xxl={15}>
          <Row wrap={false} align="middle" justify="end">
            <Switch
              onChange={handleThemeChange}
              style={{
                backgroundColor: theme === "light" ? "#110566" : "gray",
              }}
              size="small"
              checkedChildren={
                <ion-icon style={{ color: "#ffbf00" }} name="moon"></ion-icon>
              }
              unCheckedChildren={
                <ion-icon
                  style={{ color: "rgb(255 229 0)" }}
                  name="sunny"
                ></ion-icon>
              }
              defaultChecked={false}
            />
            <Menu
              style={{
                color: theme === "light" ? "#1aad90" : "#eee",
                backgroundColor: theme === "light" ? "#eee" : "#0b0055",
                borderBottom: "none",
              }}
              onClick={onClickMenuItem}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
            <Select
              labelInValue
              defaultValue={{
                value: "en",
                label: "EN",
              }}
              style={{
                fontSize: 12,
                width: 60,
                color: theme === "light" ? "#1aad90" : "#eee",
              }}
              onChange={handleChangeLanguage}
            >
              <Option value="vn">VN</Option>
              <Option value="en">EN</Option>
            </Select>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default withNamespaces()(Header);
