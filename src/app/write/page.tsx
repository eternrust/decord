import Write from "@/components/blog/BlogWrite";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
    const token = await getCookie('access_token')

    if(!token) {
        redirect('/')
    }

    return (
        <Suspense>
            <Write />
        </Suspense>
    )
}
