import React from "react";
import "./Prizes.scss";
import { useTranslation } from "react-i18next";

function PrizeBox(props) {
  return (
    <div className={`prize_box ${props.class}`}>
      <button>{props.btntext}</button>
      <span className="desc">{props.desc}</span>
    </div>
  );
}
export default function Prizes() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section className="prizes">
        <div className="custom_container">
          <div className="prizes_wrapper">
            <div className="page_heading">
              <h2>{t('prize-distribution')}</h2>
              <p>
                {t('top-ranking-players')} {t('higher-score')}
              </p>
            </div>
            <div className="prize_row">
              <PrizeBox
                class="p5"
                btntext={t('top-10%-players')}
                desc={t('25%-current-prize-pool')}
              />
              <PrizeBox
                class="p4"
                btntext={t('top-11-20')}
                desc={t('20%-current-prize-pool')}
              />
              <PrizeBox
                class="p5"
                btntext={t('top-21-30')}
                desc={t('18%-current-prize-pool')}
              />
            </div>
            <div className="prize_row">
              <PrizeBox
                class="p4"
                btntext={t('top-31-40')}
                desc={t('15%-current-prize-pool')}
              />
              <PrizeBox
                class="p5"
                btntext={t('top-41-60')}
                desc={t('12%-current-prize-pool')}
              />
              <PrizeBox
                class="p4"
                btntext={t('top-61-80')}
                desc={t('10%-current-prize-pool')}
              />
            </div>
            {/* <div className="prize_row prize_row_center">
            <PrizeBox
              class="p4 box_right"
              btntext="4th - 10th"
              desc="Prize to be set based on the overall pot and point earned"
            />
            <PrizeBox
              class="p5"
              btntext="11th - 100th"
              desc="Prize to be set based on the overall pot and point earned"
            />
          </div> */}
          </div>
        </div>
      </section>
      <section className="prizes">
        <div className="custom_container">
          <div className="prizes_wrapper">
            <div className="page_heading">
              <h2>{t('extra-bonus-pool')}</h2>
            </div>
            <div className="prize_row">
              <PrizeBox
                class="small__1"
                btntext={t('1st')}
                desc={t('25-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('2nd')}
                desc={t('15-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('3rd')}
                desc={t('10-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('4th')}
                desc={t('8-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('5th')}
                desc={t('7-extra-bonus')}
              />
            </div>
            <div className="prize_row">
              <PrizeBox
                class="small"
                btntext={t('6th')}
                desc={t('7-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('7th')}
                desc={t('7-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('8th')}
                desc={t('7-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('9th')}
                desc={t('7-extra-bonus')}
              />
              <PrizeBox
                class="small"
                btntext={t('10th')}
                desc={t('7-extra-bonus')}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
