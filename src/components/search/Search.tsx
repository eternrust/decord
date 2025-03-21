'use client'
import { getPageSearch } from "@/api/page/getPageSearch"
import { PageContentType } from "@/api/page/postPage"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import BlogPreview from "../blog/BlogPreview"

const Search = () => {
    const [data, setData] = useState<PageContentType[]>([])
    const searchParams = useSearchParams()
    const keyword = searchParams.get('q')
    const tags = searchParams.getAll('t')

    if (!keyword) redirect('/')

    useEffect(() => {
        getPageSearch({ content: keyword, tagNames: tags })
            .then(res => setData(res.data.content))
            .catch(() => toast.error('네트워크를 확인해주세요'))
    }, [keyword, tags])

    return (
        <div className="flex flex-col gap-10 py-10 px-8 items-center">
            <div className="max-w-[1200px] w-full flex flex-col gap-5">
                <span className="text-titleMedium">
                    <span className="text-blue700">&quot;{keyword}&quot;</span>에 대한 검색 결과
                </span>
            </div>
            <div className="max-w-[1200px] w-full grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 gap-8">
                {
                    data.length ?
                        data.map((data, index) => <BlogPreview key={index} data={data} />)
                        :
                        <div>페이지가 존재하지 않습니다</div>
                }
            </div>
        </div>
    )
}

export default Search;