import React from "react";
import "./Tournament.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "../Countdown/Countdown";
import Prizes from "../Prizes/Prizes";
import Presale from "../Pre-sale/Presale";
import Tour1 from "./../../../../../Assets/images/tournament1.png";
import {useTranslation} from "react-i18next";
function TourBox(props) {
  return (
    <div className="tourbox_box">
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
export default function Tournament() {
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
  const hoursMinSecs = { hours: 5, minutes: 20, seconds: 5 };
  return (
    <>
      <section className="tournament" id="tournament">
        <Countdown hoursMinSecs={hoursMinSecs} />
        <div className="custom_container">
          <div className="page_heading">
            <h2>{ t('tournaments') }</h2>
          </div>
          {/* <Carousel
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
            <TourBox
              img={Tour1}
              title="Tournament 1"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <TourBox
              img={Tour2}
              title="Tournament 2"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <TourBox
              img={Tour3}
              title="Tournament 3"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
            <TourBox
              img={Tour4}
              title="Tournament 4"
              desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
            />
          </Carousel> */}
          <TourBoxImgDesc
            img={Tour1}
            title={ `${t('tournament')} 1` }
            desc="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna"
          />
        </div>
        <Prizes />
        <Presale />
      </section>
    </>
  );

  function TourBoxImgDesc(props) {
    return (
      <div className="tourbox_box_img_desc">
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
}
