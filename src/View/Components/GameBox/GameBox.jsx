import "./GameBox.scss";
export default function GameBox(props) {
  return (
    <div className="games_box" id="games">
      <div className="image">
        <img src={props.img} alt="" />
      </div>
      <div className="content">
        <div className="title">{props.title}</div>
        <div className="desc">{props.desc}</div>
        <div className="btn-group">
          <button
            onClick={props.purchaseNftMspc}
            className="button-57"
            role="button"
          >
            <span className="text">Purchase with MSPC</span>
            <span>{props.mspc} MSPC</span>
          </button>
          <button
            onClick={props.purchaseNftUsdt}
            className="button-57"
            role="button"
          >
            <span className="text">Purchase with USDT</span>
            <span>50 USDT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
