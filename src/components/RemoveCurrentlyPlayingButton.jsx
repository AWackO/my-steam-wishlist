import React from "react";
import { useState } from "react";
import ControllerIcon from "../controller.svg";

const CurrentlyPlayingButton = (props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prevActive) => !prevActive);
    console.log(active);
  };

  return (
    <button
      title={"Remove from Currently Playing"}
      onClick={() => {
        handleClick();
        props.removeFromCurrPlay(props.game);
      }}
      style={{ backgroundColor: "#0b8f0b" }}
    >
      <img src={ControllerIcon} alt="currently playing" />
    </button>
  );
};

export default CurrentlyPlayingButton;

//"#0b8f0b"
//"#2c4ddff0"
