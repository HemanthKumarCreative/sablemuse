import { MegaMenuColumns } from "@/components/navigation/mega-menu-columns"
import { Container } from "@/components/shared/container"
import { MegaMenuFeaturedCards } from "@/components/navigation/mega-menu-featured"
import type {
  MegaMenuColumn,
  MegaMenuFeatured,
  MegaMenuVariant,
} from "@/data/navigation"
import { cn } from "cn"

type MegaMenuPanelProps = {
  label: string
  columns: MegaMenuColumn[]
  featured: MegaMenuFeatured[]
  variant?: MegaMenuVariant
  className?: string
  onNavigate?: () => void
}

export const MegaMenuPanel = ({
  label,
  columns,
  featured,
  variant = "collection",
  className,
  onNavigate,
}: MegaMenuPanelProps) => {
  const isNewIn = variant === "new-in"
  const isPlusSize = variant === "plus-size"
  const isSustainability = variant === "sustainability"
  const isFeaturedHeavy = isNewIn || isPlusSize || isSustainability

  return (
    <Container
      className={cn(
        "py-10 lg:py-12",
        isFeaturedHeavy
          ? "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
          : "grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16",
        className
      )}
      role="region"
      aria-label={`${label} menu`}
    >
      <MegaMenuColumns
        columns={columns}
        onNavigate={onNavigate}
        className={cn(
          isNewIn && "grid-cols-2 gap-12 lg:w-[min(420px,36%)] lg:shrink-0 lg:gap-16",
          isPlusSize && "grid-cols-1 lg:w-[184px] lg:shrink-0",
          isSustainability && "grid-cols-1 lg:w-[160px] lg:shrink-0"
        )}
      />
      <MegaMenuFeaturedCards
        items={featured}
        onNavigate={onNavigate}
        showLabels={!isSustainability}
        ratio={
          isSustainability
            ? 392 / 438
            : isFeaturedHeavy
              ? 208 / 420
              : 3 / 4
        }
        className={cn(
          isNewIn && "grid-cols-3 gap-4 lg:flex-1 lg:gap-6",
          isPlusSize && "grid-cols-3 gap-4 lg:max-w-[672px] lg:flex-1 lg:gap-6",
          isSustainability && "grid-cols-2 gap-6 lg:max-w-[808px] lg:flex-1"
        )}
      />
    </Container>
  )
}
