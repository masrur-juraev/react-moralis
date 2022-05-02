import Styles from "./Profile.module.css";

import { ethers } from "ethers";

import { useEffect, useState } from "react";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import Market from "../../../Contracts/Marketplace.json";
import Mr from "../../../Contracts/Mr.json";
import Ms from "../../../Contracts/Ms.json";  
import Mspc from "../../../Contracts/MSPC.json";
import Usdt from "../../../Contracts/USDT.json";
import { useMoralis } from "react-moralis";
import { isMobile, isBrowser } from "react-device-detect";
import Web3 from "web3";
import {
  mrContractAddress,
  msContractAddress,
  marketplaceContractAddress,
  usdtContractAddress,
  mspcContractAddress,
} from "../../../Contracts/contracts";

import { useTranslation } from "react-i18next";
import pro_img from "../../../Assets/images/tournament3.png";
import arrow from "../../../Assets/images/arrow.png";
import view_more from "../../../Assets/images/button_2.png";
import stars_01 from "../../../Assets/images/stars-01.png";
import stars_02 from "../../../Assets/images/stars-02.png";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
var web3,
  mrContract,
  msContract,
  marketplaceContract,
  usdtContract,
  mspcContract;
  const http = axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key":
        "LJgrel5PZhPaLpLRShkYe2tNvGqUSxtZwudQAeDjWJMLYJ2bEsaG16RWpFJ6rrrf",
    },
  });
function Profile() {
  const {
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    isWeb3EnableLoading,
    account,
    Moralis,
    logout
  } = useMoralis();
  const [fromValue, setValue] = React.useState(new Date());
  const [toValue, setToValue] = React.useState(new Date());
  const [curUser, setCurUser] = useState("");
  const [nfts, setNFts] = useState([]);
  const getMyNft = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      marketplaceContractAddress,
      Market.abi,
      signer
    );
    const myNft = await marketContract.fetchMyNFTs();
    if(myNft.length>0)
    {
    const meta = await http.get(
      `/nft/${myNft[0][0].nftContract}/${myNft[0][0].tokenId}?chain=bsc%20testnet&format=decimal`
    );
    const meta_json = JSON.parse(meta.data.metadata);
    const image_url =meta_json.image;
    const name = meta_json.name;
    let item = {
      image: image_url,
      name: name,
    };
    setNFts(item);
  }
  };
  useEffect(async()=>{
    web3 = await new Web3(Moralis.provider);
    usdtContract = await new web3.eth.Contract(Usdt.abi, usdtContractAddress);
    mspcContract = await new web3.eth.Contract(Mspc.abi, mspcContractAddress);
    mrContract = await new web3.eth.Contract(Mr.abi, mrContractAddress);
    msContract = await new web3.eth.Contract(Ms.abi, msContractAddress);
    marketplaceContract = await new web3.eth.Contract(
      Market.abi,
      marketplaceContractAddress
    );
    getMyNft();
  },[])
  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      if (isMobile) {
        enableWeb3({ provider: "walletconnect" });
      } else if (isBrowser) {
        enableWeb3();
      }
    }

    if (isWeb3Enabled) {
      setCurUser(account);
    }

    if (account) {
      console.log(account);
      setCurUser(account);
    }
  }, [isWeb3Enabled, account]);

  const logoutWallet = () => {
    logout();
  };
  return (
    <div className={Styles.container}>
      <Grid
        container
        spacing={2}
        style={{
          width: "45%",
          backgroundColor: "rgb(178, 188, 193, 0.9)",
          padding: "10px",
          marginTop: "50px",
          borderRadius: "15px",
          marginBottom: "50px",
        }}
      >
        <Grid item lg={4} sm={12} xs={12}>
        {nfts&&nfts.length>0? <Img
            alt="complex"
            src={nfts[0].image}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          />:<Img
          alt="complex"
          src={pro_img}
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        />}
        </Grid>
        <Grid item lg={8} sm={12} xs={12}>
          <Typography
            gutterBottom
            style={{ fontSize: "30px", fontWeight: "600" }}
          >
            {nfts&&nfts.length>0?nfts[0].name:'My Name'}
          </Typography>
          <Typography
            style={{ fontSize: "18px", fontWeight: "600" }}
            gutterBottom
          >
            Total score:8,888
          </Typography>
          <Typography style={{ fontSize: "18px", fontWeight: "600" }}>
            NFT Tier:spacefight Participant
          </Typography>
          <Typography style={{ fontSize: "18px", fontWeight: "600" }}>
            Stars to upgrade NFT Tier:3/4&nbsp;&nbsp;&nbsp;
            <img
              alt="star"
              src={stars_01}
              style={{
                width: "30px",
                height: "30px",
                top: "-3px",
                position: "relative",
              }}
            />
            &nbsp;
            <img
              alt="star"
              src={stars_01}
              style={{
                width: "30px",
                height: "30px",
                top: "-3px",
                position: "relative",
              }}
            />
            &nbsp;
            <img
              alt="star"
              src={stars_01}
              style={{
                width: "30px",
                height: "30px",
                top: "-3px",
                position: "relative",
              }}
            />
            &nbsp;
            <img
              alt="star"
              src={stars_02}
              style={{
                width: "30px",
                height: "30px",
                top: "-3px",
                position: "relative",
              }}
            />
          </Typography>
          <div className="list">
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item lg={3} sm={6} xs={12}>
                <Typography variant="body2" gutterBottom>
                  Best score
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  888 points
                </Typography>
                <Typography variant="body2" gutterBottom>
                  current ranking
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  5th
                </Typography>
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Typography variant="body2" gutterBottom>
                  Wrost score
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  88 points
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Totaly play count
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  66 timcs
                </Typography>
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Typography variant="body2" gutterBottom>
                  Average score
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  555 points
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Total hours played
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  50 hours
                </Typography>
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Typography variant="body2" gutterBottom>
                  Seuson score
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  888 points
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Winning rate
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: "600" }}
                >
                  80%
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <button className={Styles.view_more} onClick={logoutWallet}>Log out</button>
      <div style={{ marginBottom: "50px" }}>
        <center>
          <img alt="arrow" src={arrow} style={{ width: "70%" }} />
        </center>
      </div>
      <div className={Styles.prize_back}>
        <center>
          <Typography
            style={{ color: "white", fontWeight: "600", fontSize: "35px" }}
          >
            Financial Summary
          </Typography>
        </center>
        <Grid container spacing={1}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <div
              style={{
                backgroundColor: "rgb(178, 188, 193, 0.9)",
                borderRadius: "15px",
                padding: "15px",
              }}
            >
              <center>
                <Typography style={{ fontWeight: "150", fontSize: "20px" }}>
                  Total Prizes
                </Typography>
                <Typography style={{ fontWeight: "50", fontSize: "15px" }}>
                  500 USDT
                </Typography>
              </center>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <div
              style={{
                backgroundColor: "rgb(178, 188, 193, 0.9)",
                borderRadius: "15px",
                padding: "10px",
                minHeight:'83px'
              }}
            >
              <center>
                <Typography style={{ fontWeight: "150", fontSize: "20px" }}>
                  Total Buy-In
                </Typography>
                <Typography style={{ fontWeight: "50", fontSize: "15px" }}>
                  50 USDT&nbsp;50 MSPC
                </Typography>
              </center>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <div
              style={{
                backgroundColor: "rgb(178, 188, 193, 0.9)",
                borderRadius: "15px",
                padding: "6px",
                minHeight:'83px'
              }}
            >
              <center style={{marginTop:'3px'}}>
                <Typography style={{ fontWeight: "150", fontSize: "20px" }}>
                  Profit/Loss
                </Typography>
                <Typography style={{ fontWeight: "50", fontSize: "15px" }}>
                  +450 USDT&nbsp;-50 MSPC
                </Typography>
              </center>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={Styles.transaction_container}>
        <center>
          <Typography
            style={{ color: "black", fontWeight: "600", fontSize: "35px" }}
          >
            Financial History
          </Typography>
        </center>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} sm={12} xs={12} style={{ display: "flex" }}>
            <p style={{ marginTop: "10px" }}>From</p>&nbsp;&nbsp;
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["day", "month", "year"]}
                label="From"
                value={fromValue}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12} style={{ display: "flex" }}>
            <p style={{ marginTop: "10px" }}>To</p>&nbsp;&nbsp;
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["day", "month", "year"]}
                label="To"
                value={toValue}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td style={{ color: "red" }}>4</td>
            </tr>
          </tbody>
        </table>
        <center style={{ marginTop: "10px" }}>
          <button className={Styles.view_more}>View More</button>
        </center>
      </div>
      <div className={Styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
export default Profile;
