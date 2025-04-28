import { Ref } from "react"

interface CardProps {
  className: string
}
// 카드 컴포넌트
export const Card = ({ className, ...props }: CardProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  )
}

Card.displayName = "Card"
