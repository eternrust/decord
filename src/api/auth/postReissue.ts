import { instance } from "../axios"

export interface PostReissueRequest {
    token: string
}

export interface PostReissueResponse {
    accessToken: string
}

export const postReissue = async (data: PostReissueRequest) => {
    return await instance.post<PostReissueResponse>('/auth/reissue', data)
}