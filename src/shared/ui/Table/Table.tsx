import { ReactNode, Ref } from "react"

interface TableProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLTableElement>
}

export const Table = ({ children, className, ref, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

Table.displayName = "Table"
