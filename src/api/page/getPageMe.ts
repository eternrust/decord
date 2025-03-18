import { instance } from "../axios"
import { GetPageRequest, GetPageResponse } from "./getPageSearch"

export const getPageUser = async (token: string, data: GetPageRequest) => {
    return await instance.get<GetPageResponse>('/page/search', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: data
    })
}