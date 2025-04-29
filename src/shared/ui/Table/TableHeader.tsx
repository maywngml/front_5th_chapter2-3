import { ReactNode, Ref } from "react"

interface TableHeaderProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLTableSectionElement>
}

export const TableHeader = ({ children, className, ref, ...props }: TableHeaderProps) => {
  return (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props}>
      {children}
    </thead>
  )
}

TableHeader.displayName = "TableHeader"
