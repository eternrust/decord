'use client'
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import AuthModal from "../Auth/AuthModal";
import { useState } from "react";
import { Button } from "../base/Button";
import { RiSearch2Line } from "@remixicon/react";

const Header = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    return (
        <header className="w-full h-[60px] px-10 flex justify-between items-center fixed top-0 z-50 backdrop-blur-md border-b border-blue100">
            <Link href='/'>
                <Image src={logo} alt="logo image" width={108} height={39} />
            </Link>
            <div className="flex gap-5 items-center">
                <RiSearch2Line size={24} className="hover:text-blue600 hover:scale-110 transition-all cursor-pointer" />
                <Button size="small" onClick={() => setModalOpen(true)}>로그인</Button>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </header>
    )
}

export default Header;