import { instance } from "../axios"
import { PageContentType } from "./postPage"

export type PAGE_SORT_TYPE = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC" | "TITLE_ASC" | "TITLE_DESC"

/*
tagIds, tagNames중 하나만 입력하면 됩니다.
우선 순위: tagIds > tagNames
*/
export interface PageSearchOptions {
    page?: number           // default - 1
    size?: number           // default - 10
    content?: string        // 검색어
    sort?: PAGE_SORT_TYPE   // default - CREATED_AT_DESC
    tagNames?: string[]     // 태그 이름
    tagIds?: number[]       // 태그 id
}

export interface GetPageResponse {
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
    size: number
    content: PageContentType[]
    number: number
    sort: {
        empty: boolean
        unsorted: boolean
        sorted: boolean
    }
    pageable: {
        offset: number
        sort: {
            empty: boolean
            unsorted: boolean
            sorted: boolean
        }
        pageNumber: number
        pageSize: number
        unpaged: boolean
        paged: boolean
    }
    numberOfElements: number
    empty: boolean
}

export const getPageSearch = async (data: PageSearchOptions) => {
    return await instance.get<GetPageResponse>('/page/search', {
        params: data
    })
}