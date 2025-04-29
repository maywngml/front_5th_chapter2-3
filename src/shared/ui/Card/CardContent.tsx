import { Ref } from "react"

interface CardContentProps {
  className?: string
}

export const CardContent = ({ className, ...props }: CardContentProps, ref: Ref<HTMLDivElement>) => {
  return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
}

CardContent.displayName = "CardContent"
