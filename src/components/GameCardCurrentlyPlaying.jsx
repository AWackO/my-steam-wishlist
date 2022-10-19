import React from "react";
import RemoveCurrentlyPlayingButton from "./RemoveCurrentlyPlayingButton";

const GameCard = ({ game, removeFromCurrPlay }) => {
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
        <RemoveCurrentlyPlayingButton game={game} removeFromCurrPlay={removeFromCurrPlay} />
        <h3>{game.name}</h3>
      </div>
    </div>
  );
};

export default GameCard;
