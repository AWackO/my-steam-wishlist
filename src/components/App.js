import React, { useState, useEffect, useRef } from "react";
import "./App.modules.css";
import SearchIcon from "../search.svg";

import GameCard from "./GameCard.jsx";
import LoadingCard from "./LoadingCard";
import NotFoundCard from "./NotFoundCard";
import GameCardCurrentlyPlaying from "./GameCardCurrentlyPlaying";
import GameFilter from "./GameFilter";

let favoriteList = [];

const App = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [filteredSort, setFilteredSort] = useState("Date Added");
  const isFetching = useRef(false);
  const page = useRef(0);

  const searchGames = async (name) => {
    setIsLoading(true);
    setGames([]);
    const newGameList = [];

    while (isFetching.current) {
      const res = await fetch(`/wishlistdata?p=${page.current}`);

      page.current += 1;

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.text();

      const gameList = Object.entries(JSON.parse(data));

      for (let game of gameList) {
        newGameList.push(game[1]);
      }

      if (gameList.length === 0) {
        isFetching.current = false;
      }
    }

    page.current = 0;

    isFetching.current = false;

    if (searchTerm === "") {
      setGames(newGameList);
    } else {
      setGames(newGameList.filter((element) => element.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    isFetching.current = true;

    setIsLoading(false);
  };

  useEffect(() => {
    isFetching.current = true;
    searchGames(searchTerm);
  }, []);

  useEffect(() => {
    const currentlyPlayingGames = JSON.parse(localStorage.getItem("wishlist-currently-playing-games")) || [];
    setCurrentlyPlaying(currentlyPlayingGames);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("wishlist-currently-playing-games", JSON.stringify(items));
  };

  const addToCurrentlyPlaying = (game) => {
    if (!favoriteList.includes(game)) {
      favoriteList = [...currentlyPlaying, game];
      setCurrentlyPlaying(favoriteList);
      saveToLocalStorage(favoriteList);
    }
  };

  const removeFromCurrentlyPlaying = (game) => {
    favoriteList = currentlyPlaying.filter((playing) => playing.name !== game.name);

    setCurrentlyPlaying(favoriteList);
    saveToLocalStorage(favoriteList);
  };

  const filterChangeHandler = (selectedFilter) => {
    setFilteredSort(selectedFilter);
  };

  const filteredGames = (filter) => {
    switch (filter) {
      case "Most Reviews":
        const reviewsDescending = [...games].sort(
          (a, b) => parseInt(b.reviews_total.replace(",", ""), 10) - parseInt(a.reviews_total.replace(",", ""), 10)
        );
        return reviewsDescending;
      case "Least Reviews":
        const reviewsAscending = [...games].sort(
          (a, b) => parseInt(a.reviews_total.replace(",", ""), 10) - parseInt(b.reviews_total.replace(",", ""), 10)
        );
        return reviewsAscending;
      case "Release Date Newer":
        const newerGames = [...games].sort((a, b) => new Date(parseInt(b.release_date)) - new Date(parseInt(a.release_date)));
        return newerGames;
      case "Release Date Older":
        const olderGames = [...games].sort((a, b) => new Date(parseInt(a.release_date)) - new Date(parseInt(b.release_date)));
        return olderGames;
      default:
        return games;
    }
  };

  let gamesListFiltered = filteredGames(filteredSort);

  return (
    <div className="app">
      <h1>Steam Wishlist</h1>

      <div className="search">
        <input
          placeholder="Search for games"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchGames(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchGames(searchTerm);
          }}
        />
      </div>
      {/* favorites */}

      {currentlyPlaying && currentlyPlaying.length > 0 && games && games.length > 0 ? (
        <>
          <div className="favorite-games">
            <h2>Currently Playing</h2>
          </div>
          <div className="container fav">
            {currentlyPlaying.map((game) => (
              <GameCardCurrentlyPlaying key={game.name} game={game} removeFromCurrPlay={removeFromCurrentlyPlaying} />
            ))}
          </div>
        </>
      ) : null}

      <GameFilter onChangeFilter={filterChangeHandler} selected={filteredSort} />

      {games && games.length > 0 ? (
        <div className="container">
          {gamesListFiltered.map((game) => (
            <GameCard key={game.name} game={game} addToCurrPlay={addToCurrentlyPlaying} />
          ))}
        </div>
      ) : isLoading ? (
        <LoadingCard />
      ) : (
        <NotFoundCard />
      )}
    </div>
  );
};
export default App;
