import React from "react";
import "./Delete.css";
const Delete = ({ message, onDialog }) => {
  return (
    <div className="main-div">
      <div className="second-div">
        <h3 style={{ color: "#111"}}>{message}</h3>
        <div className="third-div">
          <button onClick={() => onDialog(true)} style={{ background: "red", color: "white", padding: "10px", marginLeft: "4px", cursor: "pointer", }}> Yes </button>
          <button onClick={() => onDialog(false)} style={{background: "green", color: "white", padding: "10px",marginRight: "4px",cursor: "pointer",}} >NO</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
