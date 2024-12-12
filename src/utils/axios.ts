// import axios from "axios";

// const instance = axios.create({
//     baseURL: 'http://13.211.141.240:8080'
// });

// export default instance;


import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use(
    (config) => {
        // get accessToken from local storage
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)

export default instance;