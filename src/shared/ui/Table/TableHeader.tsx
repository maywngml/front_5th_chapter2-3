import { Ref } from "react"

interface TableHeaderProps {
  className?: string
}

export const TableHeader = ({ className, ...props }: TableHeaderProps, ref: Ref<HTMLTableSectionElement>) => {
  return <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
}

TableHeader.displayName = "TableHeader"
