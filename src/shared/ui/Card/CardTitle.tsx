import { ReactNode, Ref } from "react"

interface CardTitleProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardTitle = ({ children, className, ref, ...props }: CardTitleProps) => {
  return (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

CardTitle.displayName = "CardTitle"
