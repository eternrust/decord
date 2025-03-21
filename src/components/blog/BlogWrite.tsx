'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import { useUserContext } from "../layout/ContextProvider"
import { getCookie } from "cookies-next"
import { Input } from "../base/Input"
import { DropZone } from "../base/DropZone"
import Image from "next/image"
import { Button } from "../base/Button"
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react"
import Editor from "../base/Editor"
import Link from "next/link"
import { Dropdown } from "../base/Dropdown"
import { PAGE_SCOPE_TYPE, postPage } from "@/api/page/postPage"
import { convertURLtoFile, fileSizeToString } from "@/utils"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { getPageDetail } from "@/api/page/getPageDetail"

interface Props {
    pageId?: string
}

const Write = ({ pageId }: Props) => {
    const [contentTitle, setContentTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isChangeImage, setIsChangeImage] = useState<boolean>(true)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [type, setType] = useState<PAGE_SCOPE_TYPE>('PUBLIC')
    const [tagList, setTagList] = useState<string[]>([])
    const tagRef = useRef<HTMLInputElement>(null)
    const user = useUserContext()
    const router = useRouter()

    const onWrite = useCallback(async () => {
        const token = await getCookie('access_token')
        const toastId = toast.loading('블로그 업로드 중입니다...')

        if (!token) {
            toast.error('잘못된 접근입니다', { id: toastId })
            router.refresh()
            return
        }

        if (!contentTitle.trim()) {
            toast.error('제목을 입력해주세요', { id: toastId })
            return
        }

        if (!tagList.length) {
            toast.error('태그를 하나 이상 입력해주세요', { id: toastId })
            return
        }

        await postPage(token, {
            title: contentTitle,
            content: content,
            scope: type,
            tags: tagList
        }, isChangeImage ? imageFile : undefined).then(() => {
            toast.success('업로드 되었습니다!', { id: toastId })
            router.refresh()
            router.push('/')
        }).catch(() => {
            toast.error('에러가 발생했습니다.', { id: toastId })
            router.refresh()
        })
    }, [contentTitle, content, tagList, type, imageFile])

    const createTag = useCallback(() => {
        const value = tagRef.current?.value.trim() || ''
        if (!value) return
        setTagList(prev => Array.from(new Set([...prev, value])))
    }, [])

    const deleteTag = useCallback((index: number) => {
        setTagList(prev => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ])
    }, [])

    const deleteFile = useCallback(() => {
        setImageFile(null)
        setPreviewImage('')
    }, [])

    const preventClose = useCallback((e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
    }, [])

    const getData = useCallback(async () => {
        const token = await getCookie('access_token')
        const toastId = toast.loading('데이터를 불러오는 중입니다...')

        if (!token || !pageId) {
            router.refresh()
            return
        }

        await getPageDetail(token, pageId).then(async res => {
            if (res.data.user.id !== user?.id) {
                toast.error('권한이 없습니다', { id: toastId })
                router.back()
                return
            }
            setContentTitle(res.data.title)
            setContent(res.data.content)
            setType(res.data.scope)
            setTagList(res.data.tags)
            if (res.data.thumbnailURL) {
                setIsChangeImage(false)
                const thumbnail = await convertURLtoFile(`${process.env.NEXT_PUBLIC_BASE_URL}/${res.data.thumbnailURL}`)
                if (thumbnail) setImageFile(thumbnail)
                else toast.error(`'${res.data.thumbnailURL}' 파일을 찾을 수 없습니다.`)
                setPreviewImage(`${process.env.NEXT_PUBLIC_BASE_URL}/${res.data.thumbnailURL}`)
            }
            toast.success('데이터를 불러오는데 성공했습니다', { id: toastId })
        }).catch(() => {
            toast.error('정보를 불러오다가 에러가 발생했습니다.')
            router.refresh()
        })
    }, [user, pageId, router])

    useEffect(() => {
        if (pageId) {
            getData()
        }
    }, [pageId])

    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, [preventClose]);

    return (
        <div className="pt-10 pb-40 px-8">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-10">
                <div className="">
                    <span className="text-titleLarge">글 {pageId ? "수정하기" : "작성하기"}</span>
                </div>
                <Input
                    label="제목"
                    placeholder="제목을 입력해주세요"
                    className="max-w-[500px]"
                    onChange={(e) => setContentTitle(e.currentTarget.value)}
                    value={contentTitle}
                />
                <Dropdown
                    label="종류"
                    onChange={(value: string) => setType(value as PAGE_SCOPE_TYPE)}
                    value={`${type}`}
                    items={[
                        { value: 'PUBLIC' },
                        { value: 'PRIVATE' },
                        { value: 'PROTECTED' }
                    ]}
                />
                <div className="flex flex-col gap-1.5">
                    <span className="text-black text-labelMedium_regular">썸네일</span>
                    <DropZone
                        onChangeFile={file => {
                            setImageFile(file)
                            setIsChangeImage(true)
                        }}
                        onChangeFileURL={setPreviewImage}
                        isImage
                    />
                </div>
                {
                    previewImage &&
                    <div className="w-full flex flex-col gap-1.5">
                        <span className="text-black text-labelMedium_regular">썸네일 preview</span>
                        <div className="relative w-fit h-fit p-5 rounded-lg bg-gray100 flex flex-col gap-5">
                            <Image
                                src={previewImage}
                                alt="preview image"
                                width="468"
                                height="330"
                                className="w-[468px] h-[330px] object-cover object-center"
                            />
                            <div className="flex justify-between items-center gap-5">
                                <span className="w-[400px] text-labelMedium_medium break-keep text-wrap">{imageFile?.name} ({fileSizeToString(imageFile?.size || 0)})</span>
                                <Button
                                    varient="red"
                                    size="small"
                                    className="px-2"
                                    onClick={deleteFile}
                                >
                                    <RiDeleteBinLine size="20" />
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                <div className="flex flex-col gap-1.5">
                    <span className="text-labelMedium_regular">내용</span>
                    <Editor
                        onChange={setContent}
                        content={content}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <Input
                        ref={tagRef}
                        label="태그"
                        placeholder="추가할 태그를 입력해주세요"
                        className="max-w-[400px] [&_input]:bg-transparent"
                        onKeyDown={(e) => {
                            if (e.nativeEvent.isComposing === false && e.key === 'Enter') {
                                createTag()
                            }
                        }}
                        icon={
                            <RiAddLine
                                size={24}
                                className="text-black cursor-pointer"
                                onClick={createTag}
                            />
                        }
                    />
                    <div className="flex flex-wrap gap-3">
                        {
                            tagList.map((v, i) => (
                                <Button key={i} onClick={() => deleteTag(i)} size="small" varient="outline">
                                    <span>{v}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center gap-5 mt-10">
                    <Link href='/'>
                        <Button varient="gray">취소하기</Button>
                    </Link>
                    <Button onClick={onWrite}>등록하기</Button>
                </div>
            </div>
        </div>
    )
}

export default Write