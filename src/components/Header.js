import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ backgroundColor: "#000000", padding: "10px 20px", color: "#ffffff" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, fontSize: "20px" }}>LoaLune</h1>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/lostark/leaderboard" style={{ color: "#ffffff", textDecoration: "none" }}>로스트아크</Link>
          <Link to="/vlrt/leaderboard" style={{ color: "#ffffff", textDecoration: "none" }}>발로란트</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;