interface DialogHeaderProps {
  className: string
}

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
}

DialogHeader.displayName = "DialogHeader"
