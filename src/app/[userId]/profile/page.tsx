import Profile from "@/components/Auth/Profile";

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const param = await params
    console.log(param)

    return <Profile />
}
