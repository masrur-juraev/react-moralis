import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import clsx from 'clsx';
import Footer from "../Home/Components/Footer/Footer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Web3 from "web3";
import Usdt from "../../../Contracts/USDT";
import {
  marketplaceContractAddress,
  mrContractAddress,
  msContractAddress,
  mspcContractAddress,
  usdtContractAddress
} from "../../../Contracts/contracts";
import Mspc from "../../../Contracts/MSPC";
import Mr from "../../../Contracts/Mr";
import Ms from "../../../Contracts/Ms";
import Market from "../../../Contracts/Marketplace";
import {useMoralis} from "react-moralis";
import {ethers} from "ethers";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from '../../../Util/api';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 145,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: "url(\"/assets/profile/leaderboard.jpg\")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  userInfoDiv: {
    width: '60%',
    backgroundColor: 'rgb(178, 188, 193, 0.8)',
    padding: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
    '@media screen and (min-width: 1200px) and (max-width: 1400px)': {
      width: '70%'
    },
    '@media screen and (max-width: 1200px)': {
      width: '90%'
    },
    '@media screen and (max-width: 930px)': {
      flexDirection: 'column'
    },
    '@media screen and (max-width: 660px)': {
      padding: 10,
      marginTop: 20
    }
  },
  profilePic: {
    width: 250,
    height: 250,
    borderRadius: 10,
    '@media screen and (max-width: 1500px)': {
      width: 200,
      height: 200
    }
  },
  userDetailInfo: {
    display: 'flex',
    flexDirection: 'column',
    color: '#1a1a1a',
    marginLeft: 50,
    width: '100%',
    '@media screen and (max-width: 930px)': {
      marginLeft: 0
    }
  },
  playerName: {
    fontFamily: 'rammettoone-regular',
    fontSize: 35,
    '@media screen and (max-width: 1600px)': {
      fontSize: 30
    },
    '@media screen and (max-width: 660px)': {
      fontSize: 24
    }
  },
  totalScore: {
    fontFamily: 'rammettoone-regular',
    fontSize: 22,
    marginRight: 20,
    '@media screen and (max-width: 1600px)': {
      fontSize: 18
    },
    '@media screen and (max-width: 660px)': {
      fontSize: 12,
      marginRight: 10
    }
  },
  starDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  starIcon: {
    width: 40,
    height: 40,
    '@media screen and (max-width: 660px)': {
      width: 20,
      height: 20
    }
  },
  scoreDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'muli-extrabold'
  },
  scoreColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  scoreHeader: {
    fontSize: 18,
    '@media screen and (max-width: 1600px)': {
      fontSize: 14
    },
    '@media screen and (max-width: 660px)': {
      fontSize: 9
    }
  },
  scoreRow: {
    fontSize: 26,
    '@media screen and (max-width: 1600px)': {
      fontSize: 22
    },
    '@media screen and (max-width: 660px)': {
      fontSize: 12
    }
  },
  arrowIcon: {
    margin: '70px 0',
    width: '700px',
    '@media screen and (max-width: 700px)': {
      width: '300px'
    }
  },
  financialSummary: {
    width: '60%',
    backgroundImage: "url(\"/assets/profile/financial-summary.png\")",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    flexDirection: 'column',
    borderRadius: 15,
    '@media screen and (min-width: 1200px) and (max-width: 1400px)': {
      width: '70%'
    },
    '@media screen and (max-width: 1200px)': {
      width: '90%'
    },
  },
  financialSummaryBigTitle: {
    color: 'white',
    marginBottom: 30,
    '@media screen and (max-width: 400px)': {
      fontSize: 18
    },
  },
  financialSummaryDetailDiv: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media screen and (max-width: 990px)': {
      flexDirection: 'column'
    },
  },
  financialSummaryEachSection: {
    backgroundColor: 'rgb(178, 188, 193, 0.8)',
    borderRadius: 15,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media screen and (max-width: 990px)': {
      marginBottom: 10,
      width: '80%'
    },
    '@media screen and (max-width: 660px)': {
      width: '100%'
    },
  },
  financialSummaryTitle: {
    fontFamily: 'rammettoone-regular',
    fontSize: 25,
    '@media screen and (max-width: 850px)': {
      fontSize: 18
    },
  },
  financialSummaryInfo: {
    fontFamily: 'muli-extrabold',
    fontSize: 27,
    '@media screen and (max-width: 850px)': {
      fontSize: 20
    },
  },
  financialHistory: {
    width: '60%',
    backgroundColor: 'rgb(178, 188, 193, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    flexDirection: 'column',
    borderRadius: 15,
    marginTop: 70,
    '@media screen and (min-width: 1200px) and (max-width: 1400px)': {
      width: '70%'
    },
    '@media screen and (max-width: 1200px)': {
      width: '90%'
    },
    '@media screen and (max-width: 540px)': {
      marginBottom: 50,
      paddingLeft: 5,
      paddingRight: 5
    },
  },
  financialHistoryBigTitle: {
    marginBottom: 30,
    '@media screen and (max-width: 400px)': {
      fontSize: 18
    },
  },
  tableWord: {
    fontFamily: 'muli-bold',
    fontSize: 20,
    '@media screen and (max-width: 990px)': {
      fontSize: 12
    },
    '@media screen and (max-width: 400px)': {
      fontSize: 10
    },
  },
  table: {
    '@media screen and (max-width: 700px)': {
      '& th': {
        padding: 4
      },
      '& td': {
        padding: 4
      }
    }
  },
  tbody: {
    backgroundColor: 'white'
  },
  viewMore: {
    backgroundImage: "url(\"/assets/profile/view-more.png\")",
    width: 156,
    height: 40,
    backgroundSize: 'cover',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    border: 0,
    fontFamily: 'rammettoone-regular',
    fontSize: 14,
    marginTop: 20,
    '&:hover': {
      opacity: 0.9
    }
  },
  datePickerDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '@media screen and (max-width: 500px)': {
      flexDirection: 'column',
      alignItems: 'unset'
    }
  },
  datePickerRow: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    '@media screen and (max-width: 500px)': {
      marginTop: 10
    }
  },
  pickerInput: {
    display: 'flex',
    alignItems: 'center'
  },
  fromToLabel: {
    marginRight: 15,
    '@media screen and (max-width: 500px)': {
      minWidth: 35
    }
  },
  divider: {
    marginTop: 15,
    width: '100%',
    height: 1,
    backgroundColor: 'black'
  }
}));

var web3, mrContract, msContract, marketplaceContract, usdtContract, mspcContract;
const http = axios.create({
  baseURL: "https://xxx.moralis.io/api/v2",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key":
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
});

const ProfilePage = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Moralis, logout, isAuthenticated } = useMoralis();
  const [fromValue, setFromValue] = React.useState(new Date());
  const [toValue, setToValue] = React.useState(new Date());
  const [myNFT, setMyNFT] = useState(null);
  const [loading, setLoading] = useState(false);
  const myWallet = localStorage.getItem("user") || '';

  useEffect(async () => {
    if (isAuthenticated) {
      web3 = await new Web3(Moralis.provider);
      usdtContract = await new web3.eth.Contract(Usdt.abi, usdtContractAddress);
      mspcContract = await new web3.eth.Contract(Mspc.abi, mspcContractAddress);
      mrContract = await new web3.eth.Contract(Mr.abi, mrContractAddress);
      msContract = await new web3.eth.Contract(Ms.abi, msContractAddress);
      marketplaceContract = await new web3.eth.Contract(
        Market.abi,
        marketplaceContractAddress
      );
      onGetMyNFT();
    }
  },[isAuthenticated]);

  const onGetMyNFT = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const marketContract = new ethers.Contract(
    //   marketplaceContractAddress,
    //   Market.abi,
    //   signer
    // );
    const mrContract = new ethers.Contract(
      mrContractAddress,
      Mr.abi,
      signer
    );
    const msContract = new ethers.Contract(
      msContractAddress,
      Ms.abi,
      signer
    );
    try {
      // const myNft = await marketContract.fetchMyNFTs();
      const mrUrl = `?module=account&action=tokennfttx&contractaddress=${mrContractAddress}&address=${myWallet}&page=1&offset=5&sort=asc&apikey=YourApiKeyToken`;
      const mrRes = await api.get(mrUrl);
      if (mrRes && mrRes.data && mrRes.data.message === 'OK') {
        // const meta = await http.get(
        //   `/nft/${myNft[0][0].nftContract}/${myNft[0][0].tokenId}?chain=bsc%20testnet&format=decimal`
        // );
        // const meta_json = JSON.parse(meta.data.metadata);
        // const image_url = meta_json.image;
        // const name = meta_json.name;
        // let item = {
        //   image: image_url,
        //   name: name,
        // };
        const tokenID = mrRes.data.result[0].tokenID;
        const jsonURL = await mrContract.tokenURI(Number(tokenID));
        const response = await api.get(jsonURL);
        setMyNFT(response.data);
      }
      const msUrl = `?module=account&action=tokennfttx&contractaddress=${msContractAddress}&address=${myWallet}&page=1&offset=5&sort=asc&apikey=YourApiKeyToken`;
      const msRes = await api.get(msUrl);
      if (msRes && msRes.data && msRes.data.message === 'OK') {
        const tokenID = msRes.data.result[0].tokenID;
        const jsonURL = await msContract.tokenURI(Number(tokenID));
        const response = await api.get(jsonURL);
        setMyNFT(response.data)
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setMyNFT(null);
      setLoading(false);
    }
  };

  const onLogout = () => {
    navigate('/');
    logout();
    localStorage.clear();
  };

  return (
    <div className={classes.container}>
      <Backdrop open={loading} >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
      {myNFT ? (
        <div className={classes.userInfoDiv}>
          <img src={myNFT['image']} className={classes.profilePic}/>
          <div className={classes.userDetailInfo}>
            <div className={classes.playerName}>{ myNFT['name'] }</div>

            <div className={classes.totalScore}>{ t('total-score') }: 8888</div>

            <div className={classes.totalScore}>{ t('nft-tier') }: Spaceflight Participant </div>

            <div className={classes.starDiv}>
              <div className={classes.totalScore}>{ t('stars-to-upgrade') }: 3 / 4</div>
              <img src={'/assets/profile/yellow-star.png'} className={classes.starIcon}/>
              <img src={'/assets/profile/yellow-star.png'} className={classes.starIcon} />
              <img src={'/assets/profile/yellow-star.png'} className={classes.starIcon} />
              <img src={'/assets/profile/white-star.png'} className={classes.starIcon} />
            </div>

            <div className={classes.scoreDiv}>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('best-score') }</div>
                <div className={classes.scoreRow}>888 { t('points') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('worst-score') }</div>
                <div className={classes.scoreRow}>88 { t('points') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('average-score') }</div>
                <div className={classes.scoreRow}>555 { t('points') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('season-score') }</div>
                <div className={classes.scoreRow}>888 { t('points') }</div>
              </div>
            </div>

            <div className={classes.scoreDiv}>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('current-ranking') }</div>
                <div className={classes.scoreRow}>{ t('5th') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('total-play-count') }</div>
                <div className={classes.scoreRow}>66 { t('times') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('total-hours-played') }</div>
                <div className={classes.scoreRow}>50 { t('hours') }</div>
              </div>
              <div className={classes.scoreColumn}>
                <div className={classes.scoreHeader}>{ t('winning-rate') }</div>
                <div className={classes.scoreRow}>80%</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.userInfoDiv}>
          No NFT Available
        </div>
      )}

      <button className={classes.viewMore} onClick={onLogout}>Log out</button>
      <img src={'/assets/profile/arrow.png'} className={classes.arrowIcon} />

      <div className={classes.financialSummary}>
        <span className={clsx(classes.playerName, classes.financialSummaryBigTitle)}>{ t('financial-summary') }</span>
        <div className={classes.financialSummaryDetailDiv}>
          <div className={classes.financialSummaryEachSection}>
            <span className={classes.financialSummaryTitle}>{ t('total-prizes') }</span>
            <span className={classes.financialSummaryInfo}>500 USDT</span>
          </div>
          <div className={classes.financialSummaryEachSection}>
            <span className={classes.financialSummaryTitle}>{ t('total-buy-in') }</span>
            <span className={classes.financialSummaryInfo}>500 USDT</span>
          </div>
          <div className={classes.financialSummaryEachSection}>
            <span className={classes.financialSummaryTitle}>{ t('profit-loss') }</span>
            <span className={classes.financialSummaryInfo}>500 USDT</span>
          </div>
        </div>
      </div>

      <div className={classes.financialHistory}>
        <span className={clsx(classes.playerName, classes.financialHistoryBigTitle)}>{ t('financial-history') }</span>
        <div className={classes.datePickerDiv}>
          <div className={classes.datePickerRow}>
            <span className={clsx(classes.tableWord, classes.fromToLabel)}>{ t('from') }</span>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Custom input"
                value={fromValue}
                onChange={(newValue) => {
                  setFromValue(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box className={classes.pickerInput}>
                    <input ref={inputRef} {...inputProps} style={{ width: 120 }} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.datePickerRow}>
            <span className={clsx(classes.tableWord, classes.fromToLabel)}>{ t('to') }</span>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Custom input"
                value={toValue}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box className={classes.pickerInput}>
                    <input ref={inputRef} {...inputProps} style={{ width: 120 }} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={classes.divider} />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className={classes.tableWord}>{ t('date') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('time') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('description') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('amount') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('status') }</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            <TableRow>
              <TableCell>
                <span className={classes.tableWord}>1 March 2021</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>12.30pm</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('purchase-user-id') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>-50 USDT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('successful') }</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className={classes.tableWord}>1 March 2021</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>12.30pm</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>Purchase of User ID NFT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>-50 USDT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>Successful</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className={classes.tableWord}>1 March 2021</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>12.30pm</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>Purchase of User ID NFT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>+100 USDT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>Successful</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className={classes.tableWord}>1 March 2021</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>12.30pm</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('game-season-1bonus') }</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>-50 USDT</span>
              </TableCell>
              <TableCell>
                <span className={classes.tableWord}>{ t('pending') }</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button className={classes.viewMore}>{ t('view-more') }</button>
      </div>

      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </div>
  )

};

export default ProfilePage;