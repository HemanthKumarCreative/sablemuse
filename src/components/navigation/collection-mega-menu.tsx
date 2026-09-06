import { MegaMenuPanel } from "@/components/navigation/mega-menu-panel"
import type { MegaMenuColumn, MegaMenuFeatured } from "@/data/navigation"

type CollectionMegaMenuProps = {
  columns: MegaMenuColumn[]
  featured: MegaMenuFeatured[]
  className?: string
  onNavigate?: () => void
}

/** @deprecated Prefer MegaMenuPanel — kept for existing imports */
export const CollectionMegaMenu = ({
  columns,
  featured,
  className,
  onNavigate,
}: CollectionMegaMenuProps) => {
  return (
    <MegaMenuPanel
      label="Collection"
      columns={columns}
      featured={featured}
      variant="collection"
      className={className}
      onNavigate={onNavigate}
    />
  )
}
