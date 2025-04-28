import { Ref } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface DialogTitleProps {
  className: string
}

export const DialogTitle = ({ className, ...props }: DialogTitleProps, ref: Ref<HTMLHeadingElement>) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}

DialogTitle.displayName = DialogPrimitive.Title.displayName
