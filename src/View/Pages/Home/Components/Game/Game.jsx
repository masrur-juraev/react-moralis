import React from "react";
import "./Game.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Game1 from "./../../../../../Assets/images/game1.png";
import Game2 from "./../../../../../Assets/images/game2.png";
import Game3 from "./../../../../../Assets/images/game3.png";
import Game4 from "./../../../../../Assets/images/game4.png";
import {useTranslation} from "react-i18next";

function GameBox(props) {
  return (
    <div className="games_box" id="games">
      <div className="image">
        <img src={props.img} alt="" />
      </div>
      <div className="content">
        <div className="title">{props.title}</div>
        <div className="desc">{props.desc}</div>
      </div>
    </div>
  );
}

export default function Game() {
  const { t } = useTranslation();
  const responsive = {
    // the naming can be any, depends on you.
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 541 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 769 },
      items: 3,
    },
    superLargeDesktop: {
      breakpoint: { max: 1920, min: 1025 },
      items: 4,
    },
  };
  return (
    <>
      <section className="game">
        <div className="custom_container">
          <div className="page_heading">
            <h2>{ t('games') }</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <Carousel
            responsive={responsive}
            ssr={true}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            autoPlay={true}
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            <GameBox
              img={Game1}
              title="Game 1"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <GameBox
              img={Game2}
              title="Game 2"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <GameBox
              img={Game3}
              title="Game 3"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <GameBox
              img={Game4}
              title="Game 4"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
          </Carousel>
        </div>
      </section>
    </>
  );
}
