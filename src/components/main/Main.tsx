'use client'
import Image from "next/image";
import banner_image from "@/assets/banner_LP.jpg"
import { Button } from "../base/Button";
import { useState } from "react";
import BlogPreview from "../blog/BlogPreview";

type POST_TYPE = 'recommend' | 'newest'

const Main = () => {
    const [postType, setPostType] = useState<POST_TYPE>('recommend')

    return (
        <div className="flex flex-col gap-10 py-10 px-8 items-center">
            <div className="relative max-w-[1200px]">
                <Image src={banner_image} alt="banner image" width={1200} height={300} className="w-[1200px] h-[300px] object-cover rounded-2xl object-right-bottom" />
                <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full p-10">
                    <span className="text-displaySmall text-white">나만의 작은 일기장</span>
                    <p className="text-displaySmall text-white">
                        <span className="text-blue200">decord</span>
                        에 글을 적어보세요!
                    </p>
                </div>
            </div>
            <div className="flex gap-5 border-b border-gray300 max-w-[1200px] w-full">
                <Button
                    varient="underline"
                    onClick={() => setPostType('recommend')}
                    className={postType === 'recommend' ? '!border-blue500 !text-blue500' : undefined}
                >
                    추천순
                </Button>
                <Button
                    varient="underline"
                    onClick={() => setPostType('newest')}
                    className={postType === 'newest' ? '!border-blue500 !text-blue500' : undefined}
                >
                    인기순
                </Button>
            </div>
            <div className="max-w-[1200px] grid grid-cols-4 gap-8">
                <BlogPreview />
                <BlogPreview />
                <BlogPreview />
                <BlogPreview />
                <BlogPreview />
            </div>
        </div>
    )
}

export default Main;