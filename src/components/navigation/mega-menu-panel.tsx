import { MegaMenuColumns } from "@/components/navigation/mega-menu-columns"
import { Container } from "@/components/shared/container"
import type { MegaMenuColumn } from "@/data/navigation"
import { cn } from "cn"

type MegaMenuPanelProps = {
  label: string
  columns: MegaMenuColumn[]
  className?: string
  onNavigate?: () => void
}

export const MegaMenuPanel = ({
  label,
  columns,
  className,
  onNavigate,
}: MegaMenuPanelProps) => {
  return (
    <Container
      className={cn("py-10 lg:py-12", className)}
      role="region"
      aria-label={`${label} menu`}
    >
      <MegaMenuColumns
        columns={columns}
        onNavigate={onNavigate}
        className="grid-cols-1 gap-8"
      />
    </Container>
  )
}
