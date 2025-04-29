import { Ref } from "react"

interface TableRowProps {
  className?: string
}

export const TableRow = ({ className, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) => {
  return (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  )
}

TableRow.displayName = "TableRow"
