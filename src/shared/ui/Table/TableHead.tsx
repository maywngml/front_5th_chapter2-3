import { ReactNode, Ref } from "react"

interface TableHeadProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLTableCellElement>
}

export const TableHead = ({ children, className, ref, ...props }: TableHeadProps) => {
  return (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

TableHead.displayName = "TableHead"
