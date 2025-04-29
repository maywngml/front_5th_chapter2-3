import { Ref } from "react"

interface TableBodyProps {
  className?: string
  ref?: Ref<HTMLTableSectionElement>
}

export const TableBody = ({ className, ref, ...props }: TableBodyProps) => {
  return <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
}

TableBody.displayName = "TableBody"
