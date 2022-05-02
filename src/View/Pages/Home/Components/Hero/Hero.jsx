import React from 'react'

import './Hero.scss'
import {useTranslation} from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <>
    <section className="hero" id="home">
        <h2>{ t('welcome-to-monmeta') }</h2>
        <p>{ t('time-to-get-your-game') }</p>
        <div className="hero_action">
          <button>{ t('download-app') }</button>
          <button>{ t('view-games') }</button>
        </div>
    </section>
    </>
  )
}
