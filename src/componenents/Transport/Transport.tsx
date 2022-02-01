import "./Transport.scss";
import stop from "../../images/stop.svg";
import play from "../../images/play.svg";

export default function Transport() {
  return (
    <div className="Transport">
      <div className="Transport__grid">
        <div className="Transport__grid__left">
          <input type="range" min="0" max="100" step="1"></input>
          <div className="volume-feedback"></div>
        </div>

        <div className="Transport__grid__center">
          <button className="button__track-forwards"></button>
          <button className="button__stop">
            <img src={stop} alt="stop icon"></img>
          </button>
          <button className="button__play-pause">
            <img src={play} alt="play icon"></img>
          </button>
          <button className="button__track-backwards"></button>
        </div>

        <div className="Transport__grid__right">
          <input value="120"></input>
        </div>
      </div>
    </div>
  );
}
