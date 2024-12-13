import React from "react";
import "./TopBar.css";

function TopBar({ onAddContainer }) {
  return (
    <div className="top-bar">
      <h1>DragTrack</h1>
      <button className="add-container-btn" onClick={onAddContainer}>
        Add Container
      </button>
    </div>
  );
}

export default TopBar;
