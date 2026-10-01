"use client"

import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { ProductDetail } from "@/types/commerce"
import { cn } from "cn"

type ProductAccordionsProps = {
  product: ProductDetail
  className?: string
  defaultOpen?: string[]
}

const parseContentToItems = (text: string) => {
  if (!text) return null
  
  // Check if text has key-value spec patterns like "Pattern type: Floral Style: Casual"
  const colonCount = (text.match(/:/g) || []).length
  if (colonCount >= 2 && !text.includes("\n")) {
    const regex = /([A-Z][a-zA-Z\s/&-]+?):\s*([^:]+?)(?=(?:[A-Z][a-zA-Z\s/&-]+?:)|$)/g
    const matches: { label: string; val: string }[] = []
    let m
    while ((m = regex.exec(text)) !== null) {
      matches.push({ label: m[1].trim(), val: m[2].trim() })
    }
    if (matches.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1 text-sm">
          {matches.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b border-brand-border/40 pb-1.5">
              <span className="font-semibold text-brand-navy text-xs uppercase tracking-wide">{item.label}</span>
              <span className="text-brand-navy-muted">{item.val}</span>
            </div>
          ))}
        </div>
      )
    }
  }

  // Fallback to regular bullet points or paragraph
  if (text.includes("\n")) {
    return (
      <ul className="list-disc space-y-1 pl-4 text-sm leading-[1.8] text-brand-navy-muted">
        {text.split("\n").filter(Boolean).map((line, idx) => (
          <li key={idx}>{line.replace(/^[-•*]\s*/, "")}</li>
        ))}
      </ul>
    )
  }

  return <p className="text-sm leading-[1.8] text-brand-navy-muted">{text}</p>
}

export const ProductAccordions = ({
  product,
  className,
  defaultOpen = ["detail", "fabric", "shipping"],
}: ProductAccordionsProps) => {
  const items = [
    { id: "fitting", label: "Fitting & Sizing", content: product.fitting },
    { id: "fabric", label: "Fabric & Material Care", content: product.fabricCare },
    { id: "detail", label: "Product Specifications", content: product.productDetail },
    {
      id: "shipping",
      label: "US Shipping & 14-Day Returns",
      content: product.shippingReturns || "Standard US delivery takes 2–5 business days. We offer hassle-free 14-day returns on all unworn items with original tags intact.",
    },
  ].filter(item => Boolean(item.content))

  return (
    <Accordion
      multiple
      defaultValue={defaultOpen}
      className={cn("gap-0 border border-brand-border bg-[#F0F2EF]", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-brand-border last:border-b-0"
        >
          <AccordionTrigger
            className="rounded-none px-4 py-4 text-base font-medium capitalize text-brand-navy hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden"
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
          <AccordionContent className="px-4 pb-4">
            {parseContentToItems(item.content)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
