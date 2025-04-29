import { Ref } from "react"

interface TableCellProps {
  className?: string
  ref?: Ref<HTMLTableCellElement>
}

export const TableCell = ({ className, ref, ...props }: TableCellProps) => {
  return <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
}

TableCell.displayName = "TableCell"
