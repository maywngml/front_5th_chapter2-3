import { ReactNode, Ref } from "react"

interface TableBodyProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLTableSectionElement>
}

export const TableBody = ({ children, className, ref, ...props }: TableBodyProps) => {
  return (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
      {children}
    </tbody>
  )
}

TableBody.displayName = "TableBody"
