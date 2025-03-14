'use client'
import { useState } from "react"
import Modal from "../base/Modal"
import Login from "./Login"
import Signup from "./Signup"

interface Props {
    isOpen: boolean
    onClose: () => void
}

type SIGN_STATUS = 'LOGIN' | 'SIGNUP'

const AuthModal = ({ isOpen, onClose }: Props) => {
    const [status, setStatus] = useState<SIGN_STATUS>('LOGIN')

    const onCancel = () => {
        setStatus('LOGIN')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            {
                status ?
                    <Login />
                    :
                    <Signup />
            }
        </Modal>
    )
}

export default AuthModal