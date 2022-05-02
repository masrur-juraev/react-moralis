import React, { useState } from "react";

import "./Faqs.scss";
import Collapsible from "./collapsible/Collapsible";
import {useTranslation} from "react-i18next";
export default function Faqs() {
  const { t } = useTranslation();
  return (
    <>
      <section className="faqs" id="faqs">
        <div className="custom_container">
          <div className="page_heading">
            <h2>{ t('frequently-asked-questions') }</h2>
          </div>
          <div className="faqs_wrapper">
            <div className="wrapper">
              <Collapsible title={ t('need-to-play') }>
                { t('mobile-device') }: { t('install-monmeta') }
                { t('digital-wallet') }: { t('register-of-metamask') }
                { t('support-metamask') }
              </Collapsible>
              <Collapsible title={ t('what-metamask') }>
                { t('metamask') }
              </Collapsible>
              <Collapsible title={ t('what-tokenpocket') }>
                { t('tokenpocket') }
              </Collapsible>
              <Collapsible title={ t('how-start') }>
                { t('step1') }<br />
                { t('step2') }<br />
                { t('step3') }<br />
                { t('step4') }<br />
                { t('step5') }
              </Collapsible>
              <Collapsible title={ t('play-the-game') }>
                { t('buy-nft') }<br />
                { t('choose-nft-user-id') }<br />
                { t('game-season') }<br />
                { t('buy-game-season') }<br />
              </Collapsible>
              <Collapsible title={ t('find-financial-history') }>
                { t('in-app') }<br />
                { t('login-cryptocurrency') }<br />
                { t('click-my-profile') }<br />
                { t('at-website') }<br />
                { t('answer-login-cryptocurrency') }<br />
                { t('click-nft-user-id') }<br />
              </Collapsible>
              <Collapsible title={ t('purchase-nft') }>
                { t('website') }<br />
                { t('choose-nft-user-id') }
              </Collapsible>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
