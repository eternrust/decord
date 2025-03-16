import { instance } from "../axios"
import { PageContentType } from "./postPage"

export const deletePage = async (token: string, id: string) => {
    return await instance.delete<PageContentType>(`/page/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}