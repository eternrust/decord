'use client'
import { PropsWithChildren, useEffect } from "react";

interface Props extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ isOpen, onClose, children }: Props) => {

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [isOpen])

    if (!isOpen) return <></>

    return (
        <div className={`w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center fixed top-0 left-0`} onClick={() => onClose()}>
            <div className="bg-white p-5 rounded-xl" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal