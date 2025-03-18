'use client'
import { getPageUser } from "@/api/page/getPageUser";
import { PageContentType } from "@/api/page/postPage";
import { UserType } from "@/api/user/getUser";
import { useEffect, useState } from "react";
import BlogPreview from "../blog/BlogPreview";
import Image from "next/image";

interface Props {
    user: UserType
}

const Profile = ({ user }: Props) => {
    const [pages, setPages] = useState<PageContentType[]>([])

    useEffect(() => {
        getPageUser({ userId: user.id })
            .then(res => setPages(res.data.content))
    }, [])

    return (
        <div className="flex flex-col gap-10 py-10 px-8 items-center">
            <div className="flex gap-10 items-center w-full max-w-[1200px]">
                {
                    user.thumbnailURL ?
                        <Image
                            src={user.thumbnailURL}
                            alt="user 이미지"
                            width={128}
                            height={128}
                            className="w-[128px] h-[128px] object-cover rounded-full cursor-pointer"
                        />
                        :
                        <div className="w-[128px] h-[128px] rounded-full bg-gray600 cursor-pointer"></div>
                }
                <span className="text-titleMedium">{user.name}</span>
            </div>
            <div className="max-w-[1200px] w-full grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 gap-8">
                {
                    pages.length ?
                        pages.map((data, index) => <BlogPreview key={index} data={data} />)
                        :
                        <div>페이지가 존재하지 않습니다</div>
                }
            </div>
        </div>
    )
}

export default Profile;