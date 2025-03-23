import { instance } from "../axios"
import { PageContentType } from "./postPage"

export const getPageDetail = async ( id: string) => {
    return await instance.get<PageContentType>(`/page/${id}`)
}