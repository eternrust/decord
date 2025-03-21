'use client'
import Image from "next/image"
import default_img from "@/assets/Blog_Banner.jpg"
import Link from "next/link"
import { PageContentType } from "@/api/page/postPage"
import { useCallback } from "react"

interface Props {
    data: PageContentType
}

const BlogPreview = ({ data }: Props) => {

    const error = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement

        target.onerror = null
        target.src = default_img.src

        return true
    }, [])

    return (
        <Link href={`${data.user.id}/${data.id}`}>
            <div className="w-full min-w-[200px] max-w-[400px] flex flex-col rounded-xl bg-white hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl hover:shadow-blue300">
                <div className="relative">
                    <Image
                        src={data.thumbnailURL || default_img}
                        alt="thumbnail"
                        height={150}
                        className="h-[150px] object-cover rounded-t-xl"
                        onError={error}
                        unoptimized={true}
                    />
                    <div className="bottom-0 left-0 w-full h-[40px] absolute backdrop-blur-md bg-[rgba(255,255,255,0.6)] px-4 py-1.5">
                        <span className="text-labelLarge_medium truncate w-[160px]">{data.title}</span>
                    </div>
                </div>
                <div className="bg-white w-full p-4 flex flex-col gap-3 rounded-b-xl">
                    <p className="text-bodyMedium line-clamp-2">{data.content}</p>
                </div>
            </div>
        </Link>
    )
}

export default BlogPreview