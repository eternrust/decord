import { instance } from "../axios"
import { PageSearchOptions, GetPageResponse } from "./getPageSearch"

export const getPageUser = async (token: string, data: PageSearchOptions) => {
    return await instance.get<GetPageResponse>('/page/search', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: data
    })
}