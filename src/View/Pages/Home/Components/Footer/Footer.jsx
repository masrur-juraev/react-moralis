import React from 'react'
import Logo from './../../../../../Assets/images/logo.png'
import Fb from './../../../../../Assets/images/fb.svg'
import Twit from './../../../../../Assets/images/twitter.svg'
import Insta from './../../../../../Assets/images/insta.svg'
import Yout from './../../../../../Assets/images/youtube.svg'
import { NavHashLink } from 'react-router-hash-link'
import './Footer.scss'
import {useTranslation} from "react-i18next";
export default function Footer() {
    const { t } = useTranslation();
  return (
        <>
            <footer>
                <div className="custom_container">
                    <div className="footer_wrapper">

                    <div className="row">
                        <div className="col-md-4">
                            <div className="footer_link">
                            <NavHashLink
                            to="/"
                            className=""
                            activeClassName="selected"
                        >{ t('pages') }</NavHashLink>
                               <NavHashLink
                            to="/#home"
                            className=""
                            activeClassName="selected"
                        >{ t('home') }</NavHashLink>
                        <NavHashLink
                            to="/#games"
                            className=""
                            activeClassName="selected"
                        >{ t('games') }</NavHashLink>
                        <NavHashLink
                            to="/#tournament"
                            className=""
                            activeClassName="selected"
                        >{ t('tournament') }</NavHashLink>
                        <NavHashLink
                            to="/#articles"
                            className=""
                            activeClassName="selected"
                        >{ t('articles-news-feed') }</NavHashLink>
                        <NavHashLink
                            to="/#faqs"
                            className=""
                            activeClassName="selected"
                        >{ t('faqs') }</NavHashLink>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="social_media">
                                <a href="#"><img src={Fb} alt="" /></a>
                                <a href="#"><img src={Twit} alt="" /></a>
                                <a href="#"><img src={Insta} alt="" /></a>
                                <a href="#"><img src={Yout} alt="" /></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="logo">
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                            </div>
                    </div>
                        <div className="copy_right">
                    <div className="row">
                            <div className="col-md-12">
                            <p>Copyright &copy; 2022 · Company Name · All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
