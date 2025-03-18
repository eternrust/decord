import { UserType } from "@/api/user/getUser";
import { getUserMe } from "@/api/user/getUserMe";
import { PropsWithChildren } from "react";
import ContextProvider from "./ContextProvider";
import Header from "./Header";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const token = (await cookies()).get('access_token')
  let user: UserType | null = null

  if (token) {
    user = await getUserMe(token.value).then((res) => {
      return res.data
    }).catch(() => {
      deleteCookie('access_token')
      return null
    })
  }

  return (
    <ContextProvider userData={user}>
      <Header />
      <main className="min-h-screen min-w-[550px] pt-[60px]">
        {children}
      </main>
    </ContextProvider>
  )
}

export default MainLayout