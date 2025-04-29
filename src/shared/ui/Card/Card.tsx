import { Ref } from "react"

interface CardProps {
  className?: string
  ref?: Ref<HTMLDivElement>
}
// 카드 컴포넌트
export const Card = ({ className, ref, ...props }: CardProps) => {
  return (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  )
}

Card.displayName = "Card"
