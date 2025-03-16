import { instance } from "../axios"

export interface PostSignupRequest {
    id: string
    pw: string
}

export const postSignup = async (data: PostSignupRequest) => {
    return await instance.post('/auth/sign-up', data)
}