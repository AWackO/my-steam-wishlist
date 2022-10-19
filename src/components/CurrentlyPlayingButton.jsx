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
      title={active ? "Remove from Currently Playing" : "Currenly Playing"}
      onClick={() => {
        handleClick();
        props.addToCurrPlay(props.game);
      }}
      style={active ? {backgroundColor: "#0b8f0b"} : {backgroundColor: "#2c4ddff0"}}
    >
      <img src={ControllerIcon} alt="currently playing" />
    </button>
  );
};

export default CurrentlyPlayingButton;

//"#0b8f0b"
//"#2c4ddff0"
