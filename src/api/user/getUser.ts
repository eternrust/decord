import { instance } from "../axios"

export interface UserType {
    id: string
    name: string
    thumbnailURL?: string
}

export const getUser = async (userId: string) => {
    return await instance.get<UserType>(`/user/${userId}`)
}