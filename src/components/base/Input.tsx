import { cls } from "@/utils"
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    fontSize?: keyof typeof SizeList
    description?: string
    isError?: boolean | number
    icon?: React.ReactNode
}

const SizeList = {
    large: 'text-labelLarge_medium',
    medium: 'text-labelMedium_regular',
    small: 'text-labelSmall_regular'
}

export const Input = ({ label, fontSize, icon, description, isError, className = '', readOnly, required, ...props }: props) => {
    const font = SizeList[fontSize ?? 'medium']

    return (
        <label className={cls("w-full flex flex-col gap-1.5 group", className)}>
            {label &&
                <span className={cls("text-labelMedium_regular transition-all",isError ? "text-red300": "text-gray900 group-focus-within:text-blue500")}>
                    {required && <sup className="mr-1 text-red400">*</sup>}
                    {label}
                </span>
            }
            <div className={cls("h-[48px] p-[12px_16px] flex items-center justify-between rounded-lg gap-5 border transition-all", isError ? "border-red300" : "border-gray200 focus-within:border-blue500")}>
                <input
                    className={cls("w-full outline-none placeholder:text-gray400", font)}
                    readOnly={readOnly}
                    required={required}
                    {...props}
                />
                {icon}
            </div>
            {
                description &&
                <span className={cls("text-bodySmall", isError ? "text-red300": "text-gray700")}>{description}</span>
            }
        </label>
    )
}