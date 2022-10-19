import React from "react";
import "./App.modules.css";

const GameFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="expenses-filter">
      <label>Filter by:</label>
      <select value={props.selected} onChange={dropdownChangeHandler}>
        <option value="Date Added">Date Added</option>
        <option value="Most Reviews">Most Reviews</option>
        <option value="Least Reviews">Least Reviews</option>
        <option value="Release Date Newer">Release Date Newest</option>
        <option value="Release Date Older">Release Date Older</option>
      </select>
    </div>
  );
};

export default GameFilter;
