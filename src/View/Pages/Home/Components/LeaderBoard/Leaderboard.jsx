import React, { useState } from "react";

import "./Leaderboard.scss";
import TopPlayer from "./../../../../../Assets/images/top_player.png";
import User from "./../../../../../Assets/images/user.png";
import { useTranslation } from "react-i18next";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState("50");
  const { t } = useTranslation();
  return (
    <>
      <section className="leaderboard">
        <div className="custom_container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-4 mb-5">
              <div className="leaderboard_box">
                <div className="heading">
                  <h2>{t("top-players")}</h2>
                </div>
                <div className="player_box_row">
                  <div className="top_player_box_wrapper">
                    <div className="top_player_box">
                      <div className="player">
                        <img src={TopPlayer} alt="" />
                        <div className="name">
                          <p>{t("player-name")}</p>
                          <span>{t("total-points")}</span>
                        </div>
                      </div>
                      <div className="details">
                        <div className="content">
                          <span>
                            {t("best-results")} : 0 {t("points")}
                          </span>
                          <span>{t("winning-rate")} : 0%</span>
                          <span>{t("time-played")} : 0 times</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top_player_box_wrapper">
                    <div className="top_player_box">
                      <div className="player">
                        <img src={TopPlayer} alt="" />
                        <div className="name">
                          <p>{t("player-name")}</p>
                          <span>{t("total-points")}</span>
                        </div>
                      </div>
                      <div className="details">
                        <div className="content">
                          <span>
                            {t("best-results")} : 0 {t("points")}
                          </span>
                          <span>{t("winning-rate")} : 0%</span>
                          <span>{t("time-played")} : 0 times</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top_player_box_wrapper">
                    <div className="top_player_box">
                      <div className="player">
                        <img src={TopPlayer} alt="" />
                        <div className="name">
                          <p>{t("player-name")}</p>
                          <span>{t("total-points")}</span>
                        </div>
                      </div>
                      <div className="details">
                        <div className="content">
                          <span>
                            {t("best-results")} : 0 {t("points")}
                          </span>
                          <span>{t("winning-rate")} : 0%</span>
                          <span>{t("time-played")} : 0 times</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12 col-xl-8">
              <div className="leaderboard_box overall_leaderbox">
                <div className="heading">
                  <h2>{t("overall-leaderboard")}</h2>
                </div>
                <div>
                  <div className="leaderboard_table">
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{t("user")}</th>
                          <th>{t("best-results")}</th>
                          <th>{t("winning-rate")}</th>
                          <th>Times played</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="custom_row">
                          <td>6</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>
                            <div className="tbl_player">
                              <img src={User} alt="" />
                              <div className="name">
                                <h5>{t("player-name")}</h5>
                                <span>{t("total-points")}</span>
                              </div>
                            </div>
                          </td>
                          <td>0 {t("points")}</td>
                          <td>0%</td>
                          <td>0 times</td>
                          <td>
                            <div className="tbl_action">
                              <button>{t("view-details")}</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
