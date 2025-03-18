'use client'
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import AuthModal from "../Auth/AuthModal";
import { Suspense, useState } from "react";
import { Button } from "../base/Button";
import { RiSearch2Line } from "@remixicon/react";
import SearchModal from "../search/SearchModal";
import { useUserContext } from "./ContextProvider";

const Header = () => {
    const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState<boolean>(false)
    const user = useUserContext()

    return (
        <header className="w-full h-[60px] px-10 flex justify-between items-center fixed top-0 z-50 backdrop-blur-md border-b border-blue100">
            <Link href='/'>
                <Image src={logo} alt="logo image" width={108} height={39} />
            </Link>
            <div className="flex gap-5 items-center">
                <RiSearch2Line
                    size={24}
                    className="hover:text-blue600 hover:scale-110 transition-all cursor-pointer"
                    onClick={() => setSearchModalOpen(true)}
                />
                {
                    user ?
                        <Link href={`/user/${user.id}`}>
                            {
                                user.thumbnailURL ?
                                    <Image src={user.thumbnailURL} alt="user 이미지" width={32} height={32} className="w-8 h-8 object-cover rounded-full cursor-pointer" />
                                    :
                                    <div className="w-8 h-8 rounded-full bg-gray600 cursor-pointer"></div>
                            }
                        </Link>
                        :
                        <Button size="small" onClick={() => setAuthModalOpen(true)}>로그인</Button>
                }
            </div>
            <Suspense>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
                <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} />
            </Suspense>
        </header>
    )
}

export default Header;