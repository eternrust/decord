import Write from "@/components/blog/BlogWrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
    const token = (await cookies()).get('access_token')

    if(!token) {
        redirect('/')
    }

    return (
        <Suspense>
            <Write />
        </Suspense>
    )
}
