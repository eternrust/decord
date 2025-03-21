import { RiInbox2Line } from "@remixicon/react";
import { useCallback } from "react";

interface FileListItemType {
    file: File
    url: string
}

interface props {
    onChange?: (data: FileListItemType[]) => void
    onChangeFile?: (file: File) => void
    onChangeFileURL?: (fileURL: string) => void
    isImage?: boolean
    isMultiple?: boolean
}

export const DropZone = ({ onChange, onChangeFile, onChangeFileURL, isImage, isMultiple }: props) => {
    const upload = useCallback((fileList: FileList | null) => {
        if (!fileList) return
        const data: FileListItemType[] = []

        for (let i = 0; i < (isMultiple ? fileList.length : 1); i++) {
            if (fileList[i]) {
                if (!isImage || fileList[i].name.match(/^.*\.(jpg|jpeg|png|heic|webp)$/)) {
                    const file = fileList[i]
                    const url = URL.createObjectURL(fileList[i])

                    onChangeFile?.(file)
                    onChangeFileURL?.(url)
                    data.push({ file, url })
                }
            }
        }

        onChange?.(data)
    }, [onChange, onChangeFile, onChangeFileURL, isImage, isMultiple])

    return (
        <label
            className="w-full h-[200px] bg-gray50 border-2 border-dotted border-gray500 hover:border-blue400 rounded-lg flex flex-col justify-center items-center gap-5"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault()
                upload(e.dataTransfer.files)
            }}
        >
            <input
                type="file"
                accept={isImage ? "image/*" : "*/*"}
                className="hidden"
                onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    upload(target.files)
                    target.value = ""
                }}
                multiple={isMultiple}
            />
            <RiInbox2Line
                size="48"
                className="text-blue600"
            />
            <span className="text-labelMedium_medium">Drag & drop 또는 클릭하여 파일을 추가하세요</span>
        </label>
    )
}