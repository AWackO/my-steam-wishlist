import React from "react";
import CurrentlyPlayingButton from "./CurrentlyPlayingButton";

const GameCard = ({ game, addToCurrPlay }) => {
  return (
    <div className="game">
      <div>
        <p>{game.release_string}</p>
      </div>

      <div>
        <img src={game.capsule} alt={game.name} />
      </div>
      <div>
        <span>{game.reviews_total}</span>
        <CurrentlyPlayingButton game={game} addToCurrPlay={addToCurrPlay} />
        <h3>{game.name}</h3>
      </div>
    </div>
  );
};

export default GameCard;
