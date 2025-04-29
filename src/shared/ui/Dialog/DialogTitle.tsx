import { Ref } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface DialogTitleProps {
  className?: string
  ref?: Ref<HTMLHeadingElement>
}

export const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}

DialogTitle.displayName = DialogPrimitive.Title.displayName
