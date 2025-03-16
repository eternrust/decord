import { instance } from "../axios"
import { PageContentType } from "./postPage"

export const getPageDetail = async (token: string, id: string) => {
    return await instance.get<PageContentType>(`/page/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}