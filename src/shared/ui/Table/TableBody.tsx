import { Ref } from "react"

interface TableBodyProps {
  className?: string
}

export const TableBody = ({ className, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) => {
  return <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
}

TableBody.displayName = "TableBody"
