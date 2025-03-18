'use client'
import { UserType } from "@/api/user/getUser"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useEffect, useRef } from "react"

interface props extends PropsWithChildren {
    userData: UserType | null
}

const context = createContext<UserType | null>(null)

export const useUserContext = () => {
    const value = useContext(context);
    if (value === undefined) {
        throw new Error('useMyContext should be used within MyContext.Provider');
    }

    return value
}

const ContextProvider = ({ userData, children }: props) => {
    const timer = useRef<NodeJS.Timeout | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (timer.current) {
            clearInterval(timer.current)
            timer.current = null
        }

        if (!userData) {
            timer.current = setInterval(() => {
                deleteCookie('access_token')
                router.refresh()
                clearInterval(timer.current as NodeJS.Timeout)
                timer.current = null
            }, 1000)
        }
    }, [userData])

    return (
        <context.Provider value={userData || null}>
            {children}
        </context.Provider>
    )
}

export default ContextProvider