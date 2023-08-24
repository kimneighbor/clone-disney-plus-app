import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://api.themoviedb.org/3',
    params: {
        api_key: REACT_APP_API_KEY,
        language: "ko-KR"
    }
});
export default instance;