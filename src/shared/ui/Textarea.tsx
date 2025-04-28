import { Ref } from "react"

interface TextareaProps {
  className: string
}

// 텍스트 영역 컴포넌트
export const Textarea = ({ className, ...props }: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`flex min-h-[150px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
}

Textarea.displayName = "Textarea"
