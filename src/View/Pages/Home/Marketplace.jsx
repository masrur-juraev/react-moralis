import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Footer from "./Components/Footer/Footer";
import Styles from "./Marketplace.module.css";
import axios from "axios";
import { useMoralis } from "react-moralis";
import { isMobile, isBrowser } from "react-device-detect";
import Web3 from "web3";

import GameBox from "../../Components/GameBox/GameBox";

import Market from "../../../Contracts/Marketplace.json";
import Mr from "../../../Contracts/Mr.json";
import Ms from "../../../Contracts/Ms.json";
import Mspc from "../../../Contracts/MSPC.json";
import Usdt from "../../../Contracts/USDT.json";

import {
  mrContractAddress,
  msContractAddress,
  marketplaceContractAddress,
  usdtContractAddress,
  mspcContractAddress,
} from "../../../Contracts/contracts";
import InfiniteScroll from "react-infinite-scroll-component";
// Global Variables
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

function Marketplace() {
  const {
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    isWeb3EnableLoading,
    account,
    Moralis,
  } = useMoralis();

  const [nfts, setNFts] = useState([]);
  const [mspcPrice, setMspcPrice] = useState(0);
  const [curUser, setCurUser] = useState("");
  const [value, setValue] = useState("mr_Monmeta");
  const [loader, setLoader] = useState("false");
  const [start, setStart] = useState(4);
  const [msStart, setMsStart] = useState(4);
  const [mrStart, setMrStart] = useState(4);

  const moralisIPFSUrl = (_string) => {
    const str = "ipfs/" + _string.substring(7, _string.length);
    return str;
  };

  const fetchMspcPrice = async () => {
    const response = await axios(
      "https://api.pancakeswap.info/api/v2/tokens/0xba509bdb71a29301860800e13867b59b461747af"
    );
    const pancakeSwapMspcPrice = (30 / response.data.data.price) * 10 ** 18;
    // const pancakeSwapMspcPrice = 3000 * 10 ** 18;
    console.log("PancakeSwapMspcPrice: ", pancakeSwapMspcPrice);

    const minMspc = await marketplaceContract.methods.minMspc().call();
    console.log("MinMspc: ", minMspc);

    const mspcPrice =
      pancakeSwapMspcPrice > minMspc
        ? pancakeSwapMspcPrice.toFixed(0).toString()
        : minMspc;

    console.log("Mspc Price: ", (mspcPrice / 10 ** 18).toFixed(0));
    setMspcPrice((mspcPrice / 10 ** 18).toFixed(0));
  };

  const purchaseNftMspc = async (_nft, _price) => {
    setLoader("true");
    const amount = web3.utils.toWei(_price, "ether");
    mspcContract.methods
      .approve(marketplaceContractAddress, amount)
      .send({
        from: curUser,
      })
      .then((res) => {
        marketplaceContract.methods
          .purchaseMarketItemByMspc(_nft.contract, Number(_nft.tokenId), amount)
          .send({
            from: curUser,
          })
          .then((res) => {
            console.log("purchase Done!");
            loadNFTs(0, 4);
            setLoader("false");
          })
          .catch((err) => {
            console.log("Error purchaing NFT", err);
            setLoader("false");
          });
      })
      .catch((err) => {
        console.log("Error approving mspc", err);
        setLoader("false");
      });
  };

  const purchaseNftUsdt = async (_nft, _price) => {
    setLoader("true");
    console.log("price: ", _price);

    console.log(
      mrContractAddress,
      Number(_nft.tokenId),
      web3.utils.toWei("50", "ether")
    );

    usdtContract.methods
      .approve(marketplaceContractAddress, _price)
      .send({
        from: curUser,
      })
      .then((res) => {
        marketplaceContract.methods
          .purchaseMarketItemByUsdt(_nft.contract, Number(_nft.tokenId), _price)
          .send({
            from: curUser,
          })
          .then((res) => {
            console.log("purchase Done!");
            loadNFTs(0, 4);
            setLoader("false");
          })
          .catch((err) => {
            console.log("Error purchaing NFT", err);
            setLoader("false");
          });
      })
      .catch((err) => {
        console.log("Error approving usdt:", err);
        setLoader("false");
      });
  };

  const load = async () => {
    if (value == "monmeta") {
      const cursor = start + 2;
      setStart(cursor);
      loadNFTs(start, 2);
    } else if (value == "mr_Monmeta") {
      const cursor = mrStart + 2;
      setMrStart(cursor);
      mrLoadNFTs(mrStart, 2);
    } else if (value == "ms_Monmeta") {
      const cursor = msStart + 2;
      setMsStart(cursor);
      msLoadNFTs(msStart, 2);
    }
  };
  const loadNFTs = async (cursor, howMany) => {
    const nft_data = await marketplaceContract.methods
      .fetchMarketItemsWithCursor(cursor, howMany)
      .call({});

    console.log(nft_data);
    const items = await Promise.all(
      nft_data[0].map(async (i) => {
        const meta = await http.get(
          `/nft/${i.nftContract}/${i.tokenId}?chain=bsc%20testnet&format=decimal`
        );
        const meta_json = JSON.parse(meta.data.metadata);
        console.log(meta_json.image);
        const image_url = meta_json.image;
        const name = meta_json.name;
        let item = {
          contract: i.nftContract,
          mspcPrice: i.mspcPrice,
          usdtPrice: i.usdtPrice,
          tokenId: Number(i.tokenId),
          author: i.author,
          holder: i.holder,
          image: image_url,
          name: name,
        };
        return item;
      })
    );
    console.log(items);
    setNFts([...nfts, ...items]);
  };
  const mrLoadNFTs = async (cursor, howMany, isInit = false) => {
    const nft_data = await marketplaceContract.methods
      .fetchMarketItemsWithCursorMr(cursor, howMany, mrContractAddress)
      .call({});
    console.log(nft_data);
    const items = await Promise.all(
      nft_data[0].map(async (i) => {
        const meta = await http.get(
          `/nft/${i.nftContract}/${i.tokenId}?chain=bsc%20testnet&format=decimal`
        );
        const meta_json = JSON.parse(meta.data.metadata);
        console.log(meta_json);
        const image_url = meta_json.image;
        const name = meta_json.name;
        let item = {
          mspcPrice: i.mspcPrice,
          usdtPrice: i.usdtPrice,
          tokenId: Number(i.tokenId),
          author: i.author,
          holder: i.holder,
          image: image_url,
          name: name,
        };
        return item;
      })
    );
    console.log(items);
    if (isInit) {
      setNFts([...items]);
    } else {
      setNFts([...nfts, ...items]);
    }
    setLoader("false");
  };
  const msLoadNFTs = async (cursor, howMany, isInit = false) => {
    const nft_data = await marketplaceContract.methods
      .fetchMarketItemsWithCursorMs(cursor, howMany, msContractAddress)
      .call({});
    console.log(nft_data);
    const items = await Promise.all(
      nft_data[0].map(async (i) => {
        const meta = await http.get(
          `/nft/${i.nftContract}/${i.tokenId}?chain=bsc%20testnet&format=decimal`
        );
        const meta_json = JSON.parse(meta.data.metadata);
        const image_url = meta_json.image;
        const name = meta_json.name;
        let item = {
          contract: i.nftContract,
          mspcPrice: i.mspcPrice,
          usdtPrice: i.usdtPrice,
          tokenId: Number(i.tokenId),
          author: i.author,
          holder: i.holder,
          image: image_url,
          name: name,
        };
        return item;
      })
    );
    console.log(items);
    if (isInit) {
      setNFts([...items]);
    } else {
      setNFts([...nfts, ...items]);
    }
    setLoader("false");
  };
  const handleChange = async (event, newValue) => {
    setLoader("true");
    if (newValue == "mr_Monmeta") {
      mrLoadNFTs(0, 4, true);
    } else if (newValue == "ms_Monmeta") {
      msLoadNFTs(0, 4, true);
    }
    setValue(newValue);
  };

  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      if (isMobile) {
        enableWeb3({ provider: "walletconnect" });
      } else if (isBrowser) {
        enableWeb3();
      }
    }
    fetchMspcPrice();

    const loadContracts = async () => {
      web3 = await new Web3(Moralis.provider);
      usdtContract = await new web3.eth.Contract(Usdt.abi, usdtContractAddress);
      mspcContract = await new web3.eth.Contract(Mspc.abi, mspcContractAddress);
      mrContract = await new web3.eth.Contract(Mr.abi, mrContractAddress);
      msContract = await new web3.eth.Contract(Ms.abi, msContractAddress);
      marketplaceContract = await new web3.eth.Contract(
        Market.abi,
        marketplaceContractAddress
      );

      console.log("Mr contract is loaded:>", mrContract);
      console.log("Ms contract is loaded:>", msContract);
      console.log("Marketplace contract  is loaded:>", marketplaceContract);
      loadNFTs(0, 4);
    };

    if (isWeb3Enabled) {
      loadContracts();
      setCurUser(account);
    }

    if (account) {
      console.log(account);
      setCurUser(account);
    }
  }, [isWeb3Enabled, account]);

  return (
    <>
      {loader == "true" ? (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            background: "black",
            opacity: "0.6",
            zIndex: "1000000",
          }}
        >
          <div className={Styles.lds_roller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={Styles.marketplace}>
        <div className={Styles.title}>
          Pre-sale game entry. Select your NFT User ID and get started!
        </div>
        <div
          className={Styles.tab}
          style={{ border: "1px solid", padding: "20px", borderRadius: "10px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            style={{ paddingLeft: "auto", paddingRight: "auto" }}
          >
            <Tab value="mr_Monmeta" label="Mr Monmeta" />
            <Tab value="monmeta" label="" disabled />
            <Tab value="ms_Monmeta" label="Ms Monmeta" />
          </Tabs>
        </div>
        <InfiniteScroll dataLength={nfts.length} next={load} hasMore={true}>
          <div className={Styles.container}>
            {nfts.length > 0 &&
              nfts.map((nft, key) => (
                <div className={Styles.flexChild} key={key}>
                  <GameBox
                    key={key}
                    purchaseNftUsdt={() => purchaseNftUsdt(nft, nft.usdtPrice)}
                    purchaseNftMspc={() => purchaseNftMspc(nft, mspcPrice)}
                    mspc={mspcPrice}
                    usdt={nft.usdtPrice}
                    img={nft.image}
                    title={nft.name}
                    desc="FREE 1 Game Season Ticket"
                  />
                </div>
              ))}
          </div>
        </InfiniteScroll>

        <div className={Styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Marketplace;
