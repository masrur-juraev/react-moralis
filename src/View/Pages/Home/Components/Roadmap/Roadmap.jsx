import React from 'react'
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";

import './Roadmap.scss'
import {useTranslation} from "react-i18next";

export default function Roadmap() {
    const { t } = useTranslation();
    return (
        <>
            <section className="roadmap">
                <div className="custom_container">
                        <div className="roadmap_wrapper">
                        <div className="page_heading">
                            <h2>{ t('roadmap') }</h2>
                            <p>{ t('first-time-buy-in') }</p>
                        </div>
                        <div className="roadmap_wrapper_tabs">
                        <Tabs
                            defaultTab="one"
                            onChange={(tabId) => { console.log(tabId) }}
                        >
                            <TabList>
                                <Tab tabFor="one"></Tab>
                                <Tab tabFor="two"></Tab>
                                <Tab tabFor="three"></Tab>
                                <Tab tabFor="four"></Tab>
                                <Tab tabFor="five"></Tab>
                            </TabList>
                            <div className="tab_panels">
                                <TabPanel tabId="one">
                                    <div className="roadmap_box">
                                        <button>1 { t('March') } 2022</button>
                                        <p>{ t('pre-sales-minting') } { t('user-can-get-free-nft') }</p>
                                    </div>
                                </TabPanel>
                                <TabPanel tabId="two">
                                    <div className="roadmap_box">
                                        <button>14 { t('March') } 2022</button>
                                        <p>{ t('pot-announcement') } { t('announce-total-pot') }</p>
                                    </div>
                                </TabPanel>
                                <TabPanel tabId="three">
                                    <div className="roadmap_box">
                                        <button>15 { t('March') } 2022</button>
                                        <p>{ t('launch-first-game') }</p>
                                    </div>
                                </TabPanel>
                                <TabPanel tabId="four">
                                    <div className="roadmap_box">
                                        <button>19 { t('March') } 2022</button>
                                        <p>{ t('1st-season-game-end') }</p>
                                    </div>
                                </TabPanel>
                                <TabPanel tabId="five">
                                    <div className="roadmap_box">
                                        <button>20 { t('March') } 2022</button>
                                        <p>{ t('payout') }
                                            { t('disburse-winning-pot') }</p>
                                    </div>
                                </TabPanel>
                            </div>
                        </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
