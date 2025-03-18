import { instance } from "../axios"

export const postUserThumbnail = async (token: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await instance.post<File>('/user/thumbnail', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}