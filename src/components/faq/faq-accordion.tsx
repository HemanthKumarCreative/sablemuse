"use client"

import { Minus, Plus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/data/faq"
import { cn } from "cn"

type FaqAccordionProps = {
  className?: string
}

export const FaqAccordion = ({ className }: FaqAccordionProps) => {
  return (
    <Accordion
      multiple
      defaultValue={["contact", "size"]}
      className={cn("w-full gap-0 border-t border-brand-border", className)}
    >
      {FAQ_ITEMS.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-brand-border"
        >
          <AccordionTrigger className="rounded-none px-0 py-5 text-left text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden md:text-lg">
            <span className="flex-1 pr-4 text-left">
              {item.question}
            </span>
            <Plus
              className="size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:hidden"
              strokeWidth={2}
              aria-hidden="true"
            />
            <Minus
              className="hidden size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:inline"
              strokeWidth={2}
              aria-hidden="true"
            />
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-5 text-sm leading-copy text-brand-navy md:text-base md:text-brand-navy-muted">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
