import axios, { AxiosError } from "axios";
import { FORBIDDEN, baseUrl } from "../configs/constants";
import { getAuthenticationToken } from "./authentication";

const axiosHttp = axios.create({
    baseURL: `${baseUrl}`,
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
    if(error.response.status == FORBIDDEN) {
        location.href = `/login?redirected=true&redirected_from=${location.pathname}`
    }
    
})


export default axiosHttp