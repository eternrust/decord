import { instance } from "../axios"

export type PAGE_SCOPE_TYPE = "PRIVATE" | "PROTECTED" | "PUBLIC"

export interface PostPageRequest {
    title: string
    content: string
    scope: PAGE_SCOPE_TYPE
    tags: string[]
}

export interface PageContentType {
    user: {
        id: string
        name: string
        thumbnailURL: string
    }
    title: string
    content: string
    scope: PAGE_SCOPE_TYPE
    tags: string[]
    thumbnailURL: string
}

export const postPage = async (token: string, data: PostPageRequest, file?: File) => {
    const formData = new FormData()

    const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json'
    })
    formData.append('body', blob)
    if (file) formData.append('file', file)

    return await instance.post<PageContentType>('/page', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}