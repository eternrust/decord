import type { MouseEvent, MutableRefObject } from "react";
import dayjs from "dayjs";
import { instance } from "@/api/axios";
import axios from "axios";
import toast from "react-hot-toast";

export const formatDate = (
    date: string | Date | undefined,
    format = "YYYYMMDD",
) => {
    return date ? dayjs(date).format(format) : undefined
}

export const cls = (...classnames: string[]) => {
    return classnames.join(" ").trim()
}

export const dateToString = (dateString: string) => {
    const today = dayjs()
    const date = dayjs(dateString)
    if (!today.diff(date, 'minute')) return `${today.diff(date, 'second')}초 전`
    if (!today.diff(date, 'hour')) return `${today.diff(date, 'minute')}분 전`
    if (!today.diff(date, 'day')) return `${today.diff(date, 'hour')}시간 전`
    if (!today.diff(date, 'week')) return `${today.diff(date, 'day')}일 전`
    if (!today.diff(date, 'month')) return `${today.diff(date, 'week')}주일 전`
    if (!today.diff(date, 'year')) return `${today.diff(date, 'month')}달 전`
    return `${today.diff(date, 'year')}년 전`
}

export const convertURLtoFile = async (url: string): Promise<File | undefined> => {
    try {
        const { headers, data } = await instance.get(url)
        const filename = url.split("/").pop()
        const metadata = { type: headers["Content-Type"] as string }
        return new File([data], filename!, metadata)
    }
    catch {
        return undefined
    }
}

export const fileSizeToString = (fileSize: number) => {
    const text = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB']
    const e = Math.floor(Math.log(fileSize) / Math.log(1024))
    return `${Number((fileSize / Math.pow(1024, e)).toFixed(2))} ${text[e]}`
}

export const getFile = async (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, name: string, fileDataList: MutableRefObject<Map<string, File>>) => {
    e.preventDefault()
    const contentTypeMap: { [key: string]: string } = {
        svg: "image/svg+xml",
        ico: "image/x-icon",
        png: "image/png",
        jpg: "image/jpeg",
        pdf: "application/pdf",
        default: "application/octet-stream"
    }
    const fileExtension = name.split(".").at(-1)?.toLowerCase();
    try {
        const { data } = fileDataList.current.has(name) ?
            { data: fileDataList.current.get(name) }
            : await axios.get(`/api/download/${name}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': contentTypeMap[fileExtension || "default"] || "application/octet-stream"
                }
            })
        const blobData = new Blob([data], { type: contentTypeMap[fileExtension || "default"] })
        const link = document.createElement("a")
        const url = window.URL.createObjectURL(blobData)

        link.href = url
        link.download = name
        link.target = "_blank"
        link.click();
        window.URL.revokeObjectURL(url)

        if (!fileDataList.current.has(name)) fileDataList.current.set(name, data)
    }
    catch {
        toast.error(`'${name}' 파일을 찾을 수 없습니다.`)
    }
}