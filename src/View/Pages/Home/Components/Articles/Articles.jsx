import React, {useState} from 'react'
import './Articles.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Article from './../../../../../Assets/images/article.jpg'
import Roadmap from '../Roadmap/Roadmap';
import Faqs from '../Faqs/Faqs';
import Footer from './../Footer/Footer'
import {useTranslation} from "react-i18next";
export default function Articles() {
  const { t } = useTranslation();
  const [articleReadMore, setArticleReadMore] = useState(false);
  const [feedReadMore, setFeedReadMore] = useState(false);

  return (
    <>
      <section className="articales" id="articles">
        <div className="custom_container">
          <div className="article_wrapper">
            <Tabs>
              <TabList>
                <Tab>{ t('articles') }</Tab>
                <Tab>{ t('news-feed') }</Tab>
              </TabList>
              <TabPanel>
                <div className="article_row">
                  <div className="article_box">
                    <div className="article_image">
                      <img src={Article} alt="" />
                    </div>
                    <div className="article_content" style={articleReadMore ? {height: 'unset'} : {}}>
                      <div className="article_author">
                        <div className="article_name">{ t('articles') } 1</div>
                        <div className="post_details">
                          <span className='date'>4 { t('February') } 2022</span>
                          <span className='name'>{ t('author-name') }</span>
                        </div>
                      </div>
                      <div className="content_text" style={articleReadMore ? {overflow: 'unset'} : {}}>
                        { t('welcome-msg') }: &nbsp;
                        { t('welcome-monmeta') }&nbsp;
                        { t('hybrid-merging') }
                        { t('how-get-started') }
                        { t('first-pick') }
                      </div>
                      {!articleReadMore && (
                        <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setArticleReadMore(true)}>{ t('read-more') } &gt;</a>
                      )}
                    </div>
                  </div>
                  {/*<div className="article_box">*/}
                  {/*    <div className="article_image">*/}
                  {/*        <img src={Article} alt="" />*/}
                  {/*    </div>*/}
                  {/*    <div className="article_content">*/}
                  {/*        <div className="article_author">*/}
                  {/*            <div className="article_name">Author Name 1</div>*/}
                  {/*            <div className="post_details">*/}
                  {/*                <span className='date'>4 February 2022</span>*/}
                  {/*                <span className='name'>Author Name</span>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <div className="content_text">*/}
                  {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur.....*/}

                  {/*        </div>*/}
                  {/*        <a href="#">Read More &gt;</a>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                  {/*<div className="article_box">*/}
                  {/*    <div className="article_image">*/}
                  {/*        <img src={Article} alt="" />*/}
                  {/*    </div>*/}
                  {/*    <div className="article_content">*/}
                  {/*        <div className="article_author">*/}
                  {/*            <div className="article_name">Author Name 1</div>*/}
                  {/*            <div className="post_details">*/}
                  {/*                <span className='date'>4 February 2022</span>*/}
                  {/*                <span className='name'>Author Name</span>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <div className="content_text">*/}
                  {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur.....*/}

                  {/*        </div>*/}
                  {/*        <a href="#">Read More &gt;</a>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                </div>
                <div className="article_action">
                  <button className="article_btn">{ t('view-more-articles') }</button>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="article_row">
                  <div className="article_box">
                    <div className="article_image">
                      <img src={Article} alt="" />
                    </div>
                    <div className="article_content" style={feedReadMore ? {height: 'unset'} : {}}>
                      <div className="article_author">
                        <div className="article_name">{ t('articles') } 1</div>
                        <div className="post_details">
                          <span className='date'>4 { t('February') } 2022</span>
                          <span className='name'>{ t('author-name') }</span>
                        </div>
                      </div>
                      <div className="content_text" style={feedReadMore ? {overflow: 'unset'} : {}}>
                        { t('launching-pre-sale') }
                      </div>
                      {!feedReadMore && (
                        <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setFeedReadMore(true)}>{ t('read-more') } &gt;</a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="article_action">
                  <button className="article_btn">{ t('view-more-articles') }</button>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <Roadmap/>
        <Faqs/>
        <Footer/>
      </section>
    </>
  )
}
