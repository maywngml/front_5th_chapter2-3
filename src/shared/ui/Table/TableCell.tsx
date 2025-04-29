import { Ref } from "react"

interface TableCellProps {
  className?: string
}

export const TableCell = ({ className, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) => {
  return <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
}

TableCell.displayName = "TableCell"
