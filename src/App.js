import Header from "./components/Header/index";
import { withNamespaces } from "react-i18next";
import i18n from "./i18n";
import "./App.scss";

function App({ t }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="App">
      <Header changeLanguage={changeLanguage} t={t} />
    </div>
  );
}

export default withNamespaces()(App);
