import { ReactNode, Ref } from "react"

interface CardHeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardHeader = ({ children, className, ref, ...props }: CardHeaderProps) => {
  return (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

CardHeader.displayName = "CardHeader"
