'use client'
import { RiCloseLine } from "@remixicon/react";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface ContextProps {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}
// 지금 상태에서는 힘드니 useReducer를 결합해서 해야할 수 있음
// provieder를 body에다 넣어서 전체적으로 감싸는 방향으로 가고
// modal마다 id를 부여해서 처리하는 식이면 괜찮을수도?
// 전에 만든 toast를 참고하면 될듯 ( map 활용했던데 그걸 사용해도 될까? => 어짜피 modal은 많이 없어서 괜찮을듯)
// 근데 여기서 문제 state가 하나라도 켜져있는지 어떻게 감지함? 각 모달마다 provider를 쓰는건 너무 불편함
// useContext가 provider 밖에서 실행되는 것이 문제라면 close 버튼이 있듯이 open 버튼이 있으면 되는게 아닐까?
// 아니면 provider를 각 모달마다 아예 감싸버릴 순 없을까?
// useMemo처럼 함수형식으로 만든다...? 좋다 해보자 => 안됐음
// 활성화된 갯수로? 아니면 그냥 아이디로 판단?
// 근데 이럴거면 그냥 state props 받는게 나을듯
// 일단 useContext 계획은 보류하는 것으로 결정

const context = createContext<ContextProps | null>(null)

const useModalContext = () => {
    const value = useContext(context)
    if (value === undefined || value === null) {
        throw new Error('useMyContext should be used within MyContext.Provider');
    }

    return value
}

//  이것도 실패
const ModalProvider = (children: () => React.ReactElement) => {
    const [state, setState] = useState<boolean>(true)

    useEffect(() => {
        if (state) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [state])

    return (
        <context.Provider value={{ state, setState }}>
            {children()}
        </context.Provider>
    )
}

const ModalContent = ({ children }: PropsWithChildren) => {
    const { state, setState } = useModalContext()

    if (state) return <></>

    return (
        <div className={`w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center fixed top-0 left-0`} onClick={() => setState(false)}>
            <div className="bg-white p-5 rounded-xl" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

const ModalCloseButton = () => {
    const { setState } = useModalContext()

    return (
        <button onClick={() => setState(false)} className="w-5 h-5">
            <RiCloseLine className="text-balck hover:text-blue600" />
        </button>
    )
}

export { ModalProvider, ModalContent, useModalContext, ModalCloseButton }