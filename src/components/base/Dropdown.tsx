'use client'
import { cls } from "@/utils"
import { RiArrowDownSLine } from "@remixicon/react"
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"

interface props {
    label?: string
    placeholder?: string
    className?: string
    items: DropdownItemType[]
    onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
    value?: string
    description?: string
    required?: boolean
    readOnly?: boolean
}

interface DropdownItemType {
    display?: string
    value: string
}

export const Dropdown = ({ label, placeholder, className = "", items, onChange = () => { }, value = "", description, required, readOnly }: props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement | null>(null)

    const valueToDisplay = useMemo(() => {
        const item = items.filter(v => v.value === value)[0]
        return [!!(item?.display || item?.value), item?.display || item?.value || placeholder]
    }, [value, items, placeholder])

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (!selectRef.current?.contains(event.target as HTMLElement)) {
            setIsOpen(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    return (
        <div ref={selectRef} className={cls("max-w-[200px] w-full flex flex-col gap-1.5 relative", className)}>
            {label && (
                <span className={cls("text-labelMedium_regular", isOpen ? "text-blue500" : "")}>
                    {required && <sup className="mr-1 text-red400">*</sup>}
                    {label}
                </span>
            )}
            <button
                type="button"
                className={cls("w-full h-12 rounded-lg border p-[12px_16px] flex gap-2 items-center justify-between transition-all", isOpen ? "border-blue500" : "border-gray200")}
                onClick={() => !readOnly && setIsOpen(prev => !prev)}
            >
                <span className={cls("truncate text-labelMedium_regular", valueToDisplay[0] ? "" : "text-gray400")}>{valueToDisplay[1]}</span>
                <RiArrowDownSLine
                    className=""
                    size="20"
                />
            </button>
            {description && <span className="text-bodySmall text-gray700">{description}</span>}
            <ul className={cls("absolute left-0 w-full h-fit max-h-[300px] rounded-lg py-1 bg-white border border-gray200 overflow-y-auto z-[51]", label ? "top-[84px]" : "top-[54px]", isOpen ? "block" : "hidden")}>
                {
                    items.map((v, i) => (
                        <li
                            key={i}
                            className={cls("w-full h-[48px] px-4 text-labelMedium_regular text-gray900 flex items-center truncate", v.value === value ? "bg-blue50" : "bg-transparent hover:bg-gray100")}
                            onClick={() => {
                                onChange(v.value)
                                setIsOpen(false)
                            }}
                        >
                            {v.display || v.value}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}