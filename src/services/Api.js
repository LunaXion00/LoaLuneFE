import axios from 'axios';
const API = axios.create({
    // baseURL: 'http://43.202.211.234:8080', // 실제 배포시 환경변수(.env)로 관리
    baseURL: 'http://localhost:8080',
  });
  export default API;