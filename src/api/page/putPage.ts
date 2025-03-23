import { instance } from "../axios"
import { PageContentType, PostPageRequest } from "./postPage"

export const putPage = async (token: string, id: string, data: PostPageRequest, file?: File | null) => {
    const formData = new FormData()

    const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json'
    })
    formData.append('body', blob)
    if (file) formData.append('file', file)

    return await instance.put<PageContentType>(`/page/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
}