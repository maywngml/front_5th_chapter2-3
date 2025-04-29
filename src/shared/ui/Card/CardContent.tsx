import { ReactNode, Ref } from "react"

interface CardContentProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardContent = ({ children, className, ref, ...props }: CardContentProps) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

CardContent.displayName = "CardContent"
