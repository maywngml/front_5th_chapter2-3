import { Ref } from "react"

interface CardHeaderProps {
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => {
  return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

CardHeader.displayName = "CardHeader"
