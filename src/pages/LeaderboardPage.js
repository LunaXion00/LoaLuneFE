import React from "react";
import { useParams } from "react-router-dom";
import LostarkLeaderboardPage from "./LostarkLeaderboardPage";
import VlrtLeaderboardPage from "./VlrtLeaderboardPage";
const LeaderboardPage = () => {
  const { gameType } = useParams();
  
  return (
    <div>
      {gameType === 'lostark' && <LostarkLeaderboardPage />}
      {gameType === 'vlrt' && <VlrtLeaderboardPage />}
    </div>
  );
};

export default LeaderboardPage;