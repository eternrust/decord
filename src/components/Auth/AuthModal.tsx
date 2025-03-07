'use client'
import { Button } from "../base/Button"
import { ModalContent, useModalContext } from "../base/Modal"

const AuthModal = () => {
    const { setState } = useModalContext()
    return <>
        <Button size="small" onClick={() => setState(true)}>로그인</Button>
        <ModalContent></ModalContent>
    </>
}

export default AuthModal