import { ReactNode, Ref } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface DialogTitleProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLHeadingElement>
}

export const DialogTitle = ({ children, className, ref, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  )
}

DialogTitle.displayName = DialogPrimitive.Title.displayName
