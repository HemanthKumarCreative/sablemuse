"use client"

import { Minus, Plus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MISSION_PILLARS } from "@/data/sustainability"
import { cn } from "cn"

type MissionPillarsAccordionProps = {
  className?: string
}

export const MissionPillarsAccordion = ({
  className,
}: MissionPillarsAccordionProps) => {
  return (
    <Accordion
      multiple
      defaultValue={["transparency"]}
      className={cn("w-full gap-0 border-t border-border", className)}
    >
      {MISSION_PILLARS.map((pillar) => (
        <AccordionItem
          key={pillar.id}
          value={pillar.id}
          className="border-b border-border"
        >
          <AccordionTrigger className="rounded-none px-0 py-5 text-left text-base font-medium capitalize text-ink hover:no-underline focus-visible:ring-2 focus-visible:ring-brand **:data-[slot=accordion-trigger-icon]:hidden md:text-lg">
            <span className="flex-1 pr-4 text-left">{pillar.title}</span>
            <Plus
              className="size-4 shrink-0 text-ink group-aria-expanded/accordion-trigger:hidden"
              strokeWidth={2}
              aria-hidden="true"
            />
            <Minus
              className="hidden size-4 shrink-0 text-ink group-aria-expanded/accordion-trigger:inline"
              strokeWidth={2}
              aria-hidden="true"
            />
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-5 text-sm leading-[1.8] capitalize text-ink-muted md:text-base md:normal-case">
            {pillar.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
