'use client'
import { useCallback, useEffect, useRef } from "react";
import { Input } from "../base/Input";
import { Button } from "../base/Button";
import { RiSearchEyeLine } from "@remixicon/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    isOpen: boolean
    onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: Props) => {
    const searchParams = useSearchParams()
    const keyword = searchParams.get('q') || ''
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const onSearch = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const param = new URLSearchParams()
        param.set('q', inputRef.current?.value || '')

        router.push('/search?' + param.toString())
        onClose()
    }, [])

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [isOpen])

    if (!isOpen) return <></>

    return (
        <div className={`w-screen h-screen bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 p-10`} onClick={() => onClose()}>
            <div className="bg-white p-5 rounded-xl w-[1000px] mx-auto flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
                <form className="flex gap-5">
                    <Input placeholder="검색어를 입력해주세요" defaultValue={keyword} ref={inputRef} />
                    <Button className="inline-block" type="submit" onClick={(e) => onSearch(e)}>
                        <RiSearchEyeLine className="text-white" />
                    </Button>
                </form>
                <div className="flex flex-col gap-3">
                    <span className="text-labelMedium_medium">이전 검색어</span>
                </div>
            </div>
        </div>
    )
}

export default SearchModal