import { instance } from "../axios"
import { PageContentType } from "./postPage"

export const getPageSuggest = async (count: number) => {
    return await instance.get<PageContentType[]>('/page/suggest', {
        params: count
    })
}