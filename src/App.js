import Header from "./components/Header/index.js";
import { withNamespaces } from "react-i18next";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.js";
import News from "./components/News/index.js";
import Home from "./components/Home/index.js";
import CountryDetail from "./components/Country/CountryDetail.js";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country-detail/:country" element={<CountryDetail />} />
        <Route path="News" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default withNamespaces()(App);
