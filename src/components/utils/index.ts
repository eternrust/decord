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

export const calcVacation = (value: string) => {
    const today = dayjs()
    const joining = dayjs(value)
    const month = today.diff(joining, 'M')
    const joiningOneYear = joining.add(1, 'y').subtract(1, 'millisecond')
    let sum = 0

    if (today < joiningOneYear.endOf('y')) {
        // 1년 미만
        if (today < joiningOneYear) {
            sum += Math.min(month, 11)
        }
        if (today > joining.add(1, 'y').startOf('y')) {
            sum += Math.min(Math.floor(joining.endOf('y').diff(joining, 'day') / 365 * 15), 15)
        }
    }
    else {
        // 1년 이후
        const year = today.startOf('y').diff(joining.startOf('y'), 'y')
        sum += 15 + Math.floor((year - 1) / 3)
    }

    return sum
}

interface VacationAddItem {
    date: string
    type: string
    count: number
    total: number
}

export const calcVacationAddList = (value: string) => {
    const data: VacationAddItem[] = []
    const today = dayjs()
    const joining = dayjs(value)
    let sum = 0
    let oneYearCheck = false

    const monthTotal = today.diff(joining, 'M')
    for (let month = 1; month <= monthTotal; month++) {
        if (!oneYearCheck && joining.add(month, 'month') >= joining.add(1, 'y').startOf('y')) {
            const count = Math.min(Math.floor(joining.endOf('y').diff(joining, 'day') / 365 * 15), 15)
            sum += count

            data.push({
                date: joining.add(1, 'y').startOf('y').format('YYYY-MM-DD'),
                type: '연차',
                count,
                total: sum
            })

            oneYearCheck = true
        }
        if (month <= 12 && today.diff(joining.add(month, 'month')) > 0) {
            data.push({
                date: joining.add(month, 'month').format('YYYY-MM-DD'),
                type: '월차',
                count: 1,
                total: ++sum
            })
        }
    }

    const yearTotal = today.startOf('y').diff(joining.startOf('y'), 'y')
    for (let year = 2; year <= yearTotal; year++) {
        const count = 15 + Math.floor((year - 1) / 3)
        data.push({
            date: joining.add(year, 'y').startOf('y').format('YYYY-MM-DD'),
            type: '연차',
            count,
            total: count
        })
    }

    return data
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