import React from 'react'
import './Howitwork.scss'
import Howcontent from './../../../../../Assets/images/howcontent.png'
import {useTranslation} from "react-i18next";

export default function Howitwork() {
  const { t } = useTranslation();
  return (
    <>
      <section className="howitwork">
        <div className="custom_container">
          <div className="howitwork_container">
            <div className="content_text">
              <h2>{ t('how-does-it-work') }</h2>
              <p>{ t('buy-in-your-entry') }</p>
              <h4>{ t('financially-transparent') }</h4>
            </div>
            <div className="content_img">
              <img src={Howcontent} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}