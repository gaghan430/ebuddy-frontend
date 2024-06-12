import axios from "axios";
import { parseCookies } from "nookies";

export const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const $instance = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL
})

const $authInstance = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL
})

$authInstance.interceptors.request.use((config) => {
    const accessToken = parseCookies().ebuddyToken
    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})


export { $authInstance, $instance };
