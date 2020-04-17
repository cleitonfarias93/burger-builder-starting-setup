import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-cd41b.firebaseio.com/'
});

export default instance;