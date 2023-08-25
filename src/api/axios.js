import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_API_KEY,
        language: "ko-KR"
    }
});
export default instance;