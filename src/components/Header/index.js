import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { withNamespaces } from "react-i18next";
import { Avatar, Row, Typography, Col } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./index.scss";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const resize = window.addEventListener("resize", function () {
      if (window.matchMedia("(max-width: 867px)").matches) {
        setshowMenu(false);
      }
    });

    return () => {};
  }, [showMenu]);

  const handleMenuShow = () => {
    setshowMenu(false);
  };

  const onHomeBack = () => {
    navigate("/");
    return;
  };
  const handleBtnMenuShow =()=>{
    setshowMenu(!showMenu);
  }

  return (
    <div
      className={
        theme === "light" ? "container__headerLight" : "container__headerDark"
      }
    >
      <div onClick={handleBtnMenuShow} className="container__header--MenuIcon">
        <ion-icon name="menu"></ion-icon>
      </div>
      <Row align="middle" justify="space-between" span={24}>
        <Col>
          <Row>
            <Avatar
              onClick={onHomeBack}
              style={{
                marginRight: "0.5rem",
                marginTop: ".5rem",
                cursor: "pointer",
              }}
              size={"large"}
              src="https://img.freepik.com/free-vector/creative-delta-variant-illustration_23-2149214962.jpg?t=st=1655984978~exp=1655985578~hmac=be9764a884e99d6774c6da9068b625908f8a1e322d5333429c35c37df154f3e7&w=740"
            />
            <Typography.Title
              onClick={onHomeBack}
              level={3}
              style={{
                display: "flex",
                color: theme === "light" ? "#111" : "#eee",
                marginTop: ".5rem",
                cursor: "pointer",
              }}
            >
              Corona
              <Typography.Title
                onClick={onHomeBack}
                level={3}
                style={{ color: "#bc2adb", cursor: "pointer" }}
              >
                Tracker
              </Typography.Title>
            </Typography.Title>
          </Row>
        </Col>
        <Navbar handleMenuShow={handleMenuShow} showMenu={showMenu} />
      </Row>
    </div>
  );
};

export default withNamespaces()(Header);
