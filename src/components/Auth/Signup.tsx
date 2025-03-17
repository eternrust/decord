'use client'
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Input } from "../base/Input";
import { useCallback, useState } from "react";
import { PostLoginRequest } from "@/api/auth/postLogin";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { Button } from "../base/Button";
import toast from "react-hot-toast";
import { postSignup, PostSignupRequest } from "@/api/auth/postSignup";

type PasswordType = 'text' | 'password'

interface Props {
    onChangeModal: () => void
}

const Signup = ({ onChangeModal }: Props) => {
    const [data, setData] = useState<PostSignupRequest>({
        id: '',
        pw: ''
    })
    const [passwordType, setPasswordType] = useState<PasswordType>('password')

    const dataChange = useCallback((label: keyof PostLoginRequest, data: string) => {
        setData(prev => ({
            ...prev,
            [label]: data
        }))
    }, [])

    const submitLogin = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const toastId = toast.loading("회원가입 중...")
        if (!data.id || !data.pw) {
            toast.error("모두 입력해주세요!", { id: toastId })
            return
        }

        await postSignup(data)
            .then(() => {
                toast.success("회원가입에 성공하셨습니다!", { id: toastId })

                onChangeModal()
            }).catch(() => {
                toast.error("회원가입에 실패하셨습니다...", { id: toastId })
            })
        return null
    }, [data, onChangeModal])

    return (
        <div className="flex flex-col py-10 gap-5 w-[460px] items-center">
            <div>
                <Image src={logo} alt="logo image" width={162} height={58.5} />
                <span className="text-labelLarge_bold text-blue600 mx-auto mt-2 block w-fit">회원가입</span>
            </div>
            <form className="w-[350px] flex flex-col gap-8">
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요"
                    onChange={(e) => dataChange('id', e.currentTarget.value)}
                    value={data.id}
                />
                <Input
                    label="패스워드"
                    placeholder="비밀번호를 입력해주세요"
                    type={passwordType}
                    autoComplete="off"
                    onChange={(e) => dataChange('pw', e.currentTarget.value)}
                    value={data.pw}
                    icon={
                        passwordType === 'text' ?
                            <RiEyeLine
                                size="20"
                                className="cursor-pointer group-focus-within:text-gray900 hover:text-gray900 text-gray300 transition-all"
                                onClick={() => setPasswordType('password')}
                            />
                            :
                            <RiEyeOffLine
                                size="20"
                                className="cursor-pointer group-focus-within:text-gray900 hover:text-gray900 text-gray300 transition-all"
                                onClick={() => setPasswordType('text')}
                            />
                    }
                />
                <Button type="submit" isFull onClick={submitLogin}>회원가입</Button>
            </form>
            <div className="inline-block text-labelSmall_semiBold">
                <span className="text-gray800">계정이 이미 있으신가요?</span>
                <span className="mx-5 text-blue400 hover:text-blue700 cursor-pointer" onClick={() => onChangeModal()}>로그인</span>
            </div>
        </div>
    )
}

export default Signup;