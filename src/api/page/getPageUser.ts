import { instance } from "../axios"
import { GetPageRequest, GetPageResponse } from "./getPageSearch"

export interface GetPageUserRequest extends GetPageRequest {
    userId: string
}

export const getPageUser = async (data: GetPageUserRequest) => {
    return await instance.get<GetPageResponse>('/page/search', {
        params: data
    })
}