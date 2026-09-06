import { cn } from "cn"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "article"
}

export const Container = ({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) => {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1240px] px-4 sm:px-5 md:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </Tag>
  )
}
