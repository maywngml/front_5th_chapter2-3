import { ReactNode } from "react"

interface DialogHeaderProps {
  children: ReactNode
  className?: string
}

export const DialogHeader = ({ children, className, ...props }: DialogHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  )
}

DialogHeader.displayName = "DialogHeader"
