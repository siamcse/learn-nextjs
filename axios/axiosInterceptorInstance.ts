import { RootState } from "@/redux/store";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const token = Cookies.get('token');

const axiosInterceptorInstance = axios.create({
    baseURL: 'http://192.168.0.186:3004'
})

axiosInterceptorInstance.interceptors.request.use((req) => {
    console.log("axiosInterceptorInstance.interceptors.request.use ~ req:", req)
    req.headers.Authorization = `Bearer ${token}`
    return req;
})
axiosInterceptorInstance.interceptors.response.use((res) => {
    console.log("🚀 ~ file: axiosInterceptorInstance.ts:14 ~ axiosInterceptorInstance.interceptors.response.use ~ res:", res)
    return res;
})

export default axiosInterceptorInstance;