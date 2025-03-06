import axios, { AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next';

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000
})

instance.interceptors.request.use(
    async (config) => config,
    async (error: AxiosError) => {
        if (error.code === '401') {
            deleteCookie('access_token')
        }
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    },
)
