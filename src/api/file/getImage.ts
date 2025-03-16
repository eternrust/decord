import { instance } from "../axios"

export const getImage = async (id: string) => {
    return await instance.get<File>(`/image/${id}`)
}