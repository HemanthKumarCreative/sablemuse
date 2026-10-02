import Link from "next/link"
import { cn } from "cn"

type SectionHeaderProps = {
  title: string
  href?: string
  linkLabel?: string
  className?: string
  titleClassName?: string
  titleId?: string
}

export const SectionHeader = ({
  title,
  href,
  linkLabel = "View all",
  className,
  titleClassName,
  titleId,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-4 mt-8 flex items-center justify-between sm:mt-10 md:mb-6 md:mt-24",
        className
      )}
    >
      <h2
        id={titleId}
        className={cn(
          "heading-section",
          titleClassName
        )}
      >
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="text-sm font-medium text-brand-navy underline-offset-2 hover:underline md:text-base"
          aria-label={`${linkLabel} ${title}`}
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}
