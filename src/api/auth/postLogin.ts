import { instance } from "../axios"

export interface PostLoginRequest {
    id: string
    pw: string
}

export interface PostLoginResponse {
    accessToken: string
    refreshToken: string
}

export const postLogin = async (data: PostLoginRequest) => {
    return await instance.post<PostLoginResponse>('/auth/sign-in', data)
}