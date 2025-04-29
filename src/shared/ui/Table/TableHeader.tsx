import { Ref } from "react"

interface TableHeaderProps {
  className?: string
  ref?: Ref<HTMLTableSectionElement>
}

export const TableHeader = ({ className, ref, ...props }: TableHeaderProps) => {
  return <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
}

TableHeader.displayName = "TableHeader"
