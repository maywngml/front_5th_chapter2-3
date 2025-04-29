import { Ref } from "react"

interface CardHeaderProps {
  className?: string
}

export const CardHeader = ({ className, ...props }: CardHeaderProps, ref: Ref<HTMLDivElement>) => {
  return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

CardHeader.displayName = "CardHeader"
