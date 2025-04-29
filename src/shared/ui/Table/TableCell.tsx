import { ReactNode, Ref } from "react"

interface TableCellProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLTableCellElement>
}

export const TableCell = ({ children, className, ref, ...props }: TableCellProps) => {
  return (
    <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
      {children}
    </td>
  )
}

TableCell.displayName = "TableCell"
