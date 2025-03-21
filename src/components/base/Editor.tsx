'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRef } from 'react'

interface Props {
  onChange: (value: string) => void
  content?: string
}

// 추후 수정 예정
const Editor = ({ onChange, content }: Props) => {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: (value) => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }

      timer.current = setInterval(() => {
        onChange(value.editor.getHTML())

        if (timer.current) {
          clearInterval(timer.current)
          timer.current = null
        }
      }, 500)
    }
  })

  return <EditorContent className='max-w-[1200px] w-full h-[500px] border border-gray200 rounded-md focus:border-blue500' editor={editor} />
}

export default Editor
