import { Ref } from "react"

interface TableHeadProps {
  className?: string
  ref?: Ref<HTMLTableCellElement>
}

export const TableHead = ({ className, ref, ...props }: TableHeadProps) => {
  return (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
}

TableHead.displayName = "TableHead"
