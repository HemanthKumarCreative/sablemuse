import type { ComponentPropsWithoutRef } from "react"
import { cn } from "cn"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article"
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">

export const Container = ({
  children,
  className,
  as: Tag = "div",
  ...props
}: ContainerProps) => {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-modimal px-4 sm:px-5 md:px-8 lg:px-10",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
