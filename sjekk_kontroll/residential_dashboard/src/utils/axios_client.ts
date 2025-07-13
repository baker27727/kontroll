import axios from "axios";
import { getAuthenticationToken } from "./authentication";
import { apiUrl } from "../constants/app_constants";

const axiosClient = axios.create({
    baseURL: `${apiUrl}`,
});

axiosClient.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    const auth_token = getAuthenticationToken()
    config.headers['token'] = auth_token
    
    return config;
},(error) => {
    return Promise.reject(error);
})


export default axiosClient