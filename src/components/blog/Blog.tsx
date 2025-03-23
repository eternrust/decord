'use client'

import { PageContentType } from "@/api/page/postPage";
import { UserType } from "@/api/user/getUser";
import { Button } from "../base/Button";
import { RiArrowLeftSLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
    user: UserType
    page: PageContentType
}

const Blog = ({ user, page }: Props) => {
    const router = useRouter()
    return (
        <div className="pt-10 pb-40 px-8">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <p className="text-titleLarge">{page.title}</p>
                    <Link href={`/${user.id}/profile`} className="flex gap-1.5 items-center">
                        {
                            user.thumbnailURL ?
                                <Image
                                    src={user.thumbnailURL}
                                    alt="user 이미지"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-cover rounded-full cursor-pointer"
                                />
                                :
                                <div className="w-5 h-5 rounded-full bg-gray600 cursor-pointer"></div>
                        }
                        <span className="text-labelSmall_medium">{user.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Blog;