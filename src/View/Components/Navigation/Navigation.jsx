import React, { useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import { NavHashLink } from "react-router-hash-link";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../../Assets/images/logo.png";
import "./Navigation.scss";
import classNames from "classnames";
import { isAndroid, isBrowser, isIOS, isMobile } from "react-device-detect";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import WalletConnectProvider from "@walletconnect/web3-provider";


const useStyles = makeStyles(() => ({
  select: {
    width: 80,
    marginTop: 10,
    marginLeft: 40,
    "& > div": {
      width: 80,
    },
    "@media screen and (max-width: 991px)": {
      marginLeft: 0,
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const {
    user,
    authenticate,
    account,
    isAuthenticated,
    logout,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  const { switchNetwork, chainId } = useChain();

  useEffect(() => {
    if (isBrowser) {
      enableWeb3();
    } else if (isMobile) {
      enableWeb3({ provider: "walletConnect" });
    }
  }, []);

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { pathname } = location;
  const { hash } = location;
  const CurrentLocation = pathname.split("/");
  const CurrentLocationHash = hash;
  const [isNav, setIsNav] = useState(false);

  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [curUser, setCurUser] = useState(null);
  const [lang, setLang] = useState("en");

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    const user = localStorage.getItem("user");
    console.log(user);
    if (user !== null) {
      setCurUser(user);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("user", account);
      setCurUser(account);
    }
  }, [account, isAuthenticated]);

  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    const visible = yOffset > currentYOffset;

    setYOffset(currentYOffset);
    setVisible(visible);
  }

  const makeSubStringForAddr = (_str) => {
    if (_str) {
      const str_address =
        _str.substring(0, 6) +
        "..." +
        _str.substring(_str.length - 5, _str.length);
      return str_address;
    }
  };

  // useEffect(() => {
  //   if (account) {
  //     setCurUser(account);
  //   } else {
  //     setCurUser("");
  //   }
  // }, [account]);

  const connectWallet = async () => {
    if (isBrowser) {
      if (!window.ethereum) {
        alert("Please install MetaMask first!");
        window.location.href = "https://metamask.io/";
      }
      if (chainId !== "0x61") {
        try {
          await switchNetwork("0x61");
        } catch (err) {
          console.log(err);
        }
      }
      await authenticate({
        provider: "injected",
        signingMessage: "Welcome to our MetaMoon!",
        onComplete: () => {
          setCurUser(account);
        },
      });
    }
    if (isMobile) {
       const provider = new WalletConnectProvider({
            rpc: {
            97: "https://data-seed-prebsc-1-s1.binance.org",
            }
       });

      await authenticate({
        provider: "walletconnect",
        chainId: 97,
        signingMessage: "Welcome to our MetaMoon!",
        onComplete: () => {
          enableWeb3({ provider: "walletConnect", chainId: 97 });
          setCurUser(account);
        },
      });

    }
  };

  const onChangeLang = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <React.Fragment>
      <section
        className={classNames("navigation navbar", {
          navbar__hidden: !visible,
        })}
      >
        <div className="left">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className={`links ${isNav ? "mobile_link" : ""}`}>
            <NavLink
              to="/marketplace"
              onClick={() => setIsNav(!isNav)}
              className={`${
                CurrentLocation === "marketplace" ||
                CurrentLocationHash == "marketplace"
                  ? "activelink"
                  : ""
              }`}
            >
              {t("marketplace")}
            </NavLink>
            <NavHashLink
              to="/#home"
              onClick={() => setIsNav(!isNav)}
              className={`${
                CurrentLocation === "" ||
                CurrentLocationHash == "" ||
                CurrentLocationHash === "#home"
                  ? "activelink"
                  : ""
              }`}
            >
              {t("home")}
            </NavHashLink>
            <NavHashLink
              onClick={() => setIsNav(!isNav)}
              to="/#tournament"
              className={`${
                CurrentLocationHash === "#tournament" ? "activelink" : ""
              }`}
            >
              {t("tournament")}
            </NavHashLink>
            <NavHashLink
              onClick={() => setIsNav(!isNav)}
              to="/#articles"
              className={`${
                CurrentLocationHash === "#articles" ? "activelink" : ""
              }`}
            >
              {t("articles-news-feed")}
            </NavHashLink>
            <NavHashLink
              onClick={() => setIsNav(!isNav)}
              to="/#faqs"
              className={`${
                CurrentLocationHash === "#faqs" ? "activelink" : ""
              }`}
            >
              {t("faqs")}
            </NavHashLink>
            <FormControl variant="standard">
              <Select
                className={classes.select}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={lang}
                label="Language"
                onChange={onChangeLang}
              >
                <MenuItem value={"en"} key={"en"}>
                  EN
                </MenuItem>
                <MenuItem value={"cn"} key={"cn"}>
                  {t("cn")}
                </MenuItem>
              </Select>
            </FormControl>
            <div className="cta mobile_cta">
              {!curUser ? (
                <button onClick={() => connectWallet()}>
                  {t("login-wallet")}
                </button>
              ) : (
                <button onClick={() => setIsNav(!isNav)}>
                  <Link to="profile">{makeSubStringForAddr(curUser)}</Link>
                </button>
              )}
            </div>
          </div>
          <div
            onClick={() => setIsNav(!isNav)}
            className={`mobile_toggle ${isNav ? "active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="right">
          <div className="cta">
            {curUser ? (
              <button>
                <Link to="profile">{makeSubStringForAddr(curUser)}</Link>
              </button>
            ) : (
              <button onClick={() => connectWallet()}>
                {t("login-wallet")}
              </button>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
