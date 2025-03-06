import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "../base/Button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full h-[60px] px-10 flex justify-between items-center fixed top-0 z-50 backdrop-blur-md border-b border-blue100">
            <Link href='/'>
                <Image src={logo} alt="logo image" width={108} height={39} />
            </Link>
            <div>
                <Button size="small">로그인</Button>
            </div>
        </header>
    )
}

export default Header;