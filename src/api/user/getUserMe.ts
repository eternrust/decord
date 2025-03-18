import { instance } from "../axios"
import { UserType } from "./getUser"

export const getUserMe = async (token: string) => {
    return await instance.get<UserType>('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}