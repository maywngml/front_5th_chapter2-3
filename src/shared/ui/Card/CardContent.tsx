import { Ref } from "react"

interface CardContentProps {
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardContent = ({ className, ref, ...props }: CardContentProps) => {
  return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
}

CardContent.displayName = "CardContent"
