import { getPageDetail } from "@/api/page/getPageDetail";
import { getUser } from "@/api/user/getUser";
import Blog from "@/components/blog/Blog";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string, pageId: string }>
}) {
  const { userId, pageId } = await params
  const user = await getUser(userId)
    .then(res => res.data)
    .catch(() => notFound())

  const page = await getPageDetail(pageId)
    .then(res => res.data)
    .catch(() => notFound())

  if (user.id !== page.user.id) {
    notFound()
  }

  return <Blog user={user} page={page} />
}
