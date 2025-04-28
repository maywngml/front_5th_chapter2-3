import { Ref } from "react"

interface TableProps {
  className: string
}

export const Table = ({ className, ...props }: TableProps, ref: Ref<HTMLTableElement>) => {
  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  )
}

Table.displayName = "Table"
