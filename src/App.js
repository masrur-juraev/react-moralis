import React from "react";
import "./App.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./View/Pages/Home/Home";
import Marketplace from "./View/Pages/Home/Marketplace";
import Navigation from "./View/Components/Navigation/Navigation";
import Profile from "./View/Pages/Home/new_profile";
import { useMoralis } from "react-moralis";
import { isMobile } from "react-device-detect";
import "./i18n/config";
import ProfilePage from "./View/Pages/Profile/Index";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  React.useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      if (isMobile) {
        enableWeb3({ provider: "walletConnect" });
      } else {
        enableWeb3({ provider: connectorId });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/*<Route path="/profile" element={<Profile />} />*/}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
