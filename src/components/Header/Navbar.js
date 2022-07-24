import i18n from "../../i18n";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography, Switch, Radio, Modal, Input, message } from "antd";
import { withNamespaces } from "react-i18next";
import { update } from "../../redux/themeSlice";
import { useNavigate } from "react-router";

const Navbar = ({ t, showMenu, handleMenuShow }) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [value1, setValue1] = useState("en");
  const langugeOption = ["vn", "en"];
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [confirmLoadingLogin, setConfirmLoadingLogin] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [confirmLoadingRegister, setConfirmLoadingRegister] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCfPassword, setNewCfPassword] = useState("");
  const [errorRegister, setErrorRegister] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [token, setToken] = useState(false)

  const handleChangeLanguage = ({ target: { value } }) => {
    i18n.changeLanguage(value);
    setValue1(value);
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
  const handleMenuItemClick = (linkto) => {
    if (window.matchMedia("(max-width: 867px)").matches) {
      handleMenuShow();
    }
    navigate(`${linkto}`);
  };
  const showModalLogin = () => {
    handleMenuShow();
    setVisibleLogin(true);
  };
  const handleOkLogin = () => {
    setConfirmLoadingLogin(true);
    setTimeout(() => {
      setConfirmLoadingLogin(false);
    }, 500);
    const keys = Object.keys(localStorage);
    const value = Object.values(localStorage);
    if (name === "admin" && password === "admin") {
      localStorage.setItem("token", true)
      message.success(t("Successful_Login"));
      setVisibleLogin(false);
      setErrorLogin(false);
      navigate("/");
    }
    for (let i = 0; i < keys.length; i++) {
      if (name === keys[i] && password === value[i]) {
        navigate("/");
        message.success(t("Successful_Login"));
        localStorage.setItem("token", true)
        setVisibleLogin(false);
        setErrorLogin(false);
      }
    }
    setErrorLogin(true);

  };
  const handleCancelLogin = () => {
    setVisibleLogin(false);
    setErrorLogin(false)
  };
  const showModalRegister = () => {
    handleMenuShow();
    setVisibleRegister(true);
  };
  const handleOkRegister = () => {
    setConfirmLoadingRegister(true);
    setTimeout(() => {
      setConfirmLoadingRegister(false);
    }, 500);
    if (newName !== "" && newPassword !== "") {
      if (newPassword === newCfPassword) {
        localStorage.setItem(newName, newPassword);
        message.success(t("Successful_Register"));
        setErrorRegister(false);
        setVisibleRegister(false);
      }
    } else {
      setVisibleRegister(true);
    }
    setErrorRegister(true);
  };
  const handleCancelRegister = () => {
    setVisibleRegister(false);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [localStorage.getItem("token")])

  const onLogOut = () => {
    setToken(localStorage.setItem("token", false))
  }

  return (
    <div
      className={
        showMenu === false
          ? "container__header--navbar"
          : "container__header--navbarVertical"
      }
    >
      <ul>
        <li onClick={() => handleMenuItemClick(' ')}>
          <Typography.Text>
            <ion-icon name="home"></ion-icon> {t("Header_Home")}
          </Typography.Text>
        </li>
        <li onClick={() => handleMenuItemClick("News")}>
          <Typography.Text>{t("Header_News")}</Typography.Text>
        </li>
        <li onClick={() => showModalLogin()}>
          <Typography.Text>{t("Header_Login")}</Typography.Text>
        </li>
        {token === 'true' ?
          (<li>
            <ion-icon style={{ color: '#ffc107' }} name="key"></ion-icon>
          </li>)
          : null
        }
        <li onClick={() => showModalRegister()}>
          <Typography.Text>{t("Header_Register")}</Typography.Text>
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }} onClick={() => onLogOut()}>
          <Typography.Text>{t("Header_Logout")}</Typography.Text>
        </li>
        <li>
          <Switch
            defaultChecked={false}
            onChange={handleThemeChange}
            style={{ backgroundColor: "#0b0056" }}
            checkedChildren={
              <ion-icon style={{ color: "yellow" }} name="moon"></ion-icon>
            }
            unCheckedChildren={
              <ion-icon style={{ color: "orange" }} name="sunny"></ion-icon>
            }
          />
        </li>
        <li>
          <Radio.Group
            size="small"
            optionType="button"
            buttonStyle="solid"
            onChange={handleChangeLanguage}
            options={langugeOption}
            value={value1}
          />
        </li>
        <div>
          <Modal
            zIndex={9999999999999999999999999999}
            title={t("Login_Modal_Title")}
            visible={visibleLogin}
            onOk={handleOkLogin}
            confirmLoading={confirmLoadingLogin}
            onCancel={handleCancelLogin}
          >
            <div>
              <Typography.Text>{t("Login_lable_form_name")}</Typography.Text>
            </div>
            <Input
              onChange={(e) => setName(e.target.value)}
              style={{ width: "17.1rem" }}
            />
            <div>
              <Typography.Text>
                {t("Login_lable_form_password")}
              </Typography.Text>
            </div>
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "17.1rem" }}
            />
            <div>
              {errorLogin === true ? (
                <Typography.Text style={{ color: "red" }}>
                  {t("Register_Modal_Error")}
                </Typography.Text>
              ) : (
                " "
              )}
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            zIndex={999999999999999999999999999999}
            title={t("Register_Modal_Title")}
            visible={visibleRegister}
            onOk={handleOkRegister}
            confirmLoading={confirmLoadingRegister}
            onCancel={handleCancelRegister}
          >
            <div>
              <Typography.Text>{t("Login_lable_form_name")}</Typography.Text>
            </div>
            <Input
              onChange={(e) => setNewName(e.target.value)}
              style={{ width: "17.1rem" }}
            />
            <div>
              <Typography.Text>
                {t("Login_lable_form_password")}
              </Typography.Text>
            </div>
            <Input.Password
              type={password}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "17.1rem" }}
            />
            <div>
              <Typography.Text>
                {t("Login_lable_form_confirmpassword")}
              </Typography.Text>
            </div>
            <Input
              onChange={(e) => setNewCfPassword(e.target.value)}
              style={{ width: "17.1rem" }}
            />
            <div>
              {errorRegister === true ? (
                <Typography.Text style={{ color: "red" }}>
                  {t("Register_Modal_Error")}
                </Typography.Text>
              ) : null}
            </div>
          </Modal>
        </div>
      </ul>
    </div>
  );
};

export default withNamespaces()(Navbar);
