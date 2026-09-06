"use client"

import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { ProductDetail } from "@/data/products"
import { cn } from "cn"

type ProductAccordionsProps = {
  product: ProductDetail
  className?: string
  defaultOpen?: string[]
}

export const ProductAccordions = ({
  product,
  className,
  defaultOpen = ["fabric", "shipping"],
}: ProductAccordionsProps) => {
  const items = [
    { id: "fitting", label: "Fitting", content: product.fitting },
    { id: "fabric", label: "Fabric & Care", content: product.fabricCare },
    { id: "detail", label: "Product Detail", content: product.productDetail },
    {
      id: "shipping",
      label: "Shipping And Returns",
      content: product.shippingReturns,
    },
  ]

  return (
    <Accordion
      multiple
      defaultValue={defaultOpen}
      className={cn("gap-0 border border-border bg-[#F0F2EF]", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-border last:border-b-0"
        >
          <AccordionTrigger
            className="rounded-none px-4 py-4 text-base font-medium capitalize text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden"
          >
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
          <AccordionContent className="px-4 pb-4 text-sm leading-[1.8] text-ink-muted">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
