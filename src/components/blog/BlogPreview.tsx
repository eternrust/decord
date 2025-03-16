'use client'
import Image from "next/image"
import default_img from "@/assets/Blog_Banner.jpg"
import Link from "next/link"

const BlogPreview = () => {
    return (
        <Link href={''}>
            <div className="w-full min-w-[200px] max-w-[350px] flex flex-col rounded-xl bg-white hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl hover:shadow-blue300">
                <div className="relative">
                    <Image src={default_img} alt="thumbnail" width={350} height={200} className="h-[150px] object-cover rounded-t-xl" />
                    <div className="bottom-0 left-0 w-full h-[40px] absolute backdrop-blur-md bg-[rgba(255,255,255,0.6)] px-4 py-1.5">
                        <span className="text-labelLarge_medium truncate w-[160px]">제목목목</span>
                    </div>
                </div>
                <div className="bg-white w-full p-4 flex flex-col gap-3 rounded-b-xl">
                    <p className="truncate"></p>
                </div>
            </div>
        </Link>
    )
}

export default BlogPreview