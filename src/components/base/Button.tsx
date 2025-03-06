'use client'
import { cls } from "@/utils"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { useFormStatus } from "react-dom"

interface props extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: keyof typeof ButtonColor
  size?: keyof typeof SizeList
  isFull?: boolean
}

interface colorType {
  enabled: string
  disabled: string
}

const ButtonColor: Record<string, colorType> = {
  primary: {
    enabled: 'transition-all bg-blue500 text-white rounded-xl hover:bg-blue600',
    disabled: 'bg-gray300 text-gray200 rounded-xl',
  },
  blue: {
    enabled:
      'transition-all bg-blue50 text-blue500 rounded-xl border border-blue100 hover:bg-blue100 text-blue500 border border-blue200',
    disabled: 'bg-gray100 text-gray300 rounded-xl',
  },
  red: {
    enabled:
      'transition-all bg-[#FFE6D8] text-[#DB2C36] rounded-xl border border-[#F3AAAA] hover:bg-[#DB2C36] hover:border-[#DB2C36] hover:text-[#FFE6D8]',
    disabled: 'bg-gray100 text-gray300 rounded-xl',
  },
  gray: {
    enabled:
      'transition-all bg-gray100 text-gray900 rounded-xl hover:bg-gray200',
    disabled: 'bg-gray100 text-gray300 rounded-xl',
  },
  white: {
    enabled:
      'transition-all bg-white text-gray800 rounded-xl hover:bg-gray50 hover:text-blue500',
    disabled: 'bg-white text-gray300 rounded-xl',
  },
  outline: {
    enabled:
      'transition-all bg-white text-gray800 border border-blue400 rounded-xl hover:bg-blue50 hover:text-blue500',
    disabled: 'bg-white text-gray300 border border-gray300',
  },
  underline: {
    enabled:
      'transition-all bg-white text-gray400 border-b-2 border-transparent hover:border-black hover:text-black',
    disabled: 'bg-white text-gray300 border border-gray300',
  }
}

const SizeList = {
  large: 'text-labelLarge_medium px-8 py-4',
  medium: 'text-labelMedium_regular px-6 py-3',
  small: 'text-labelSmall_regular px-4 py-2'
}

export const Button = ({ className = '', varient = 'primary', size, disabled, isFull, type, children, ...props }: props) => {
  const { pending } = useFormStatus()
  const color = ButtonColor[varient][disabled ? 'disabled' : 'enabled']
  const font = SizeList[size ?? 'medium']

  return (
    <button
      type={type ?? "button"}
      className={cls('select-none', color, font, isFull ? 'w-full' : 'w-fit', className)}
      disabled={(type === "submit" && pending) || disabled}
      {...props}
    >
      {children}
    </button>
  )
}