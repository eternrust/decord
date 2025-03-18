import { getPageSearch } from "@/api/page/getPageSearch";
import { getPageSuggest } from "@/api/page/getPageSuggest";
import Main from "@/components/main/Main";

export default async function Page() {
  const recommend = await getPageSuggest(8)
    .then(res => res.data)
    .catch(() => [])

  const newest = await getPageSearch({ size: 8 })
    .then(res => res.data.content)
    .catch(() => [])

  return <Main recommend={recommend} newest={newest} />
}
