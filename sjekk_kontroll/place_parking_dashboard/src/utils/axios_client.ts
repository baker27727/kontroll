import axios, { AxiosError } from "axios";
import { getAuthenticationToken } from "./authentication";
import { apiUrl } from "../configs/constants";

const axiosHttp = axios.create({
    baseURL: `${apiUrl}`,
});

axiosHttp.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    const auth_token = getAuthenticationToken()
    config.headers['token'] = auth_token
    
    return config;
},(error) => {
    return Promise.reject(error);
})

axiosHttp.interceptors.response.use((response) => {    
    return response
}, (error: AxiosError) => {
    if(error?.response?.status === 403) {
        location.href = `/login?redirected=true&redirected_from=${location.pathname}`
    }

    return Promise.reject(error);
    
})


export default axiosHttp