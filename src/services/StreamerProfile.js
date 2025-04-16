import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://43.202.211.234:8080',
  baseURL: 'http://localhost:8080',
});

export const fetchStreamerProfile = async (streamerName, gameType) => {
  try {
    const response = await API.get(`/streamers/${streamerName}/${gameType}`);
    console.log(streamerName, gameType);
    return response.data;
  } catch (error) {
    console.error('Error fetching streamer details:', error);
    throw new Error('스트리머 정보를 불러오는데 실패했습니다');
  }
};