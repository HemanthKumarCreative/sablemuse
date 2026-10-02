import { cn } from "cn"

const isWhiteSwatch = (hex: string) => hex.trim().toLowerCase() === "#ffffff"

type ColorSwatchProps = {
  hex: string
  name: string
  className?: string
  decorative?: boolean
}

export const ColorSwatch = ({
  hex,
  name,
  className,
  decorative = false,
}: ColorSwatchProps) => {
  return (
    <span
      className={cn(
        "inline-block size-4 rounded-full border sm:size-6",
        isWhiteSwatch(hex) ? "border-brand-border" : "border-transparent",
        className
      )}
      style={{ backgroundColor: hex }}
      title={decorative ? undefined : name}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : name}
    />
  )
}
