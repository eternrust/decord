import { instance } from "../axios"
import { PageContentType, PostPageRequest } from "./postPage"

export const putPage = async (token: string, id: string, data: PostPageRequest) => {
    return await instance.put<PageContentType>(`/page/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}