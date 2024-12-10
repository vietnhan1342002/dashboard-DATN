import axios from "axios";

const instance = axios.create({
    baseURL: 'http://13.211.141.240:8080'
});

export default instance;