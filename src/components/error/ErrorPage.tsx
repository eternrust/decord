'use client'
import { RiErrorWarningLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { Button } from "../base/Button"

const ErrorPage = () => {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col items-center gap-5 py-20">
      <RiErrorWarningLine
        size="48"
        className="text-blue500"
      />
      <span className="text-titleLarge">404 Error</span>
      <span className="text-subTitleLarge">페이지를 찾을 수 없어요</span>
      <div className="flex gap-5 mt-20">
        <Button
          varient="blue"
          className="w-[130px] h-fit"
          onClick={() => router.back()}
        >
          뒤로가기
        </Button>
        <Button
          varient="primary"
          className="w-[130px] h-fit"
          onClick={() => router.push('/')}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage