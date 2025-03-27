import { instance } from "../axios"
import { PageSearchOptions, GetPageResponse } from "./getPageSearch"

export interface GetPageUserRequest extends PageSearchOptions {
    userId: string
}

export const getPageUser = async (data: GetPageUserRequest) => {
    return await instance.get<GetPageResponse>('/page/search', {
        params: data
    })
}