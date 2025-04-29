import { Ref } from "react"

interface CardTitleProps {
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const CardTitle = ({ className, ref, ...props }: CardTitleProps) => {
  return <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
}

CardTitle.displayName = "CardTitle"
