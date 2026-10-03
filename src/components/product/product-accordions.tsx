"use client"

import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { shippingCopy } from "@/data/shipping-policy"
import type { ProductDetail } from "@/types/commerce"
import { cn } from "cn"

type ProductAccordionsProps = {
  product: ProductDetail
  className?: string
  defaultOpen?: string[]
}

const renderCopy = (text: string) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    return <p className="text-sm leading-copy text-brand-navy-muted">{text}</p>
  }

  return (
    <div className="space-y-2">
      {lines.map((line, index) => (
        <p key={`${line}-${index}`} className="text-sm leading-copy text-brand-navy-muted">
          {line}
        </p>
      ))}
    </div>
  )
}

export const ProductAccordions = ({
  product,
  className,
  defaultOpen,
}: ProductAccordionsProps) => {
  const items = [
    product.fitting
      ? { id: "fitting", label: "Fitting & Sizing", content: product.fitting }
      : null,
    product.fabricCare
      ? {
          id: "fabric",
          label: "Fabric & Material Care",
          content: product.fabricCare,
        }
      : null,
    {
      id: "shipping",
      label: "Shipping and returns",
      content: shippingCopy(product.shipsFromUs).detail,
    },
  ].filter((item): item is { id: string; label: string; content: string } =>
    Boolean(item)
  )
  const openItems = defaultOpen ?? items.map((item) => item.id)

  if (items.length === 0) {
    return null
  }

  return (
    <Accordion
      multiple
      defaultValue={openItems}
      className={cn("gap-0 border border-brand-border bg-muted", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-brand-border last:border-b-0"
        >
          <AccordionTrigger className="rounded-none px-4 py-4 text-base font-medium text-brand-navy hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
            <span className="flex-1 text-left">{item.label}</span>
            <Plus
              className="size-4 shrink-0 text-current group-aria-expanded/accordion-trigger:hidden"
              strokeWidth={2}
              aria-hidden="true"
            />
            <Minus
              className="hidden size-4 shrink-0 text-current group-aria-expanded/accordion-trigger:inline"
              strokeWidth={2}
              aria-hidden="true"
            />
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {renderCopy(item.content)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
