import { instance } from "../axios"
import { PageContentType } from "./postPage"

export type PAGE_SORT_TYPE = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "TITLE_ASC" | "TITLE_DESC"

export interface GetPageRequest {
    userId: string
    page?: number           // default - 1
    size?: number           // default - 10
    sort?: PAGE_SORT_TYPE   // default - CREATED_AT_DESC
}

export interface GetPageResponse {
    totalElements: number,
    totalPages: number,
    first: boolean,
    last: boolean,
    size: number,
    content: PageContentType[],
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    pageable: {
        offset: number,
        sort: {
            empty: boolean,
            unsorted: boolean,
            sorted: boolean
        },
        pageNumber: number,
        pageSize: number,
        unpaged: boolean,
        paged: boolean
    },
    numberOfElements: number,
    empty: boolean
}

export const getPage = async (token: string, data: GetPageRequest) => {
    return await instance.get<GetPageResponse>('/page', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: data
    })
}