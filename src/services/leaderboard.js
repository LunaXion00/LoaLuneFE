import API from './Api';

export const fetchLeaderboard = async (gameType) => {
  try {
    const response = await API.get(`api/${gameType}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};