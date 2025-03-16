import Blog from "@/components/blog/Blog";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string, blogId: string }>
}) {
  const param = await params
  console.log(param)

  return <Blog />
}
