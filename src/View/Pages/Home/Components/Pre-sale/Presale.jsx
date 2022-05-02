import React from "react";
import "./Presale.scss";
import Promo1 from "./../../../../../Assets/images/promo1.jpg";
import Promo2 from "./../../../../../Assets/images/promo2.jpg";
import {useTranslation} from "react-i18next";
export default function Presale() {
  const { t } = useTranslation();
  return (
    <section className="presale">
      <div className="custom_container">
        <div className="page_heading">
          <h2>{ t('pre-sale-minting') }</h2>
          <p>{ t('purchase-your-user-id') }</p>
        </div>
        <div className="view_purchase">
          <h2>{ t('promo-for-new-users') }</h2>
          <div className="presale_row">
            <div className="tourbox_box">
              <div className="image">
                <img src={Promo1} alt="" />
              </div>
              <div className="content">
                <div className="title">{ t('nft-user-id') }</div>
                <div className="title">50 USDT / 50 MSPC</div>
              </div>
            </div>
            <div className="plus">
              <span>+</span>
            </div>
            <div className="tourbox_box">
              <div className="image">
                <img src={Promo2} alt="" />
              </div>
              <div className="content red">
                <div className="title">{ t('game-season-ticket') }</div>
                <div className="title">50 USDT / 50 MSPC</div>
                <div className="desc">
                  <span>{ t('now-free') }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="presale_row">
            <button>{ t('view-and-purchase') }</button>
          </div>
        </div>
      </div>
    </section>
  );
}
