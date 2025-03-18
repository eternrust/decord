import { getUser } from "@/api/user/getUser";
import Profile from "@/components/Auth/Profile";
import { notFound } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params
    const user = await getUser(userId)
        .then(res => res.data)
        .catch(() => notFound())

    return <Profile user={user} />
}
