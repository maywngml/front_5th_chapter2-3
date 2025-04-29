import { Ref } from "react"

interface CardTitleProps {
  className?: string
}

export const CardTitle = ({ className, ...props }: CardTitleProps, ref: Ref<HTMLDivElement>) => {
  return <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

CardTitle.displayName = "CardTitle"
