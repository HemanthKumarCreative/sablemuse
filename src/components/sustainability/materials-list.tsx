"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  SUSTAINABILITY_MATERIAL_DETAILS,
  type SustainabilityMaterialDetail,
} from "@/data/sustainability"
import { cn } from "cn"

type MaterialsListProps = {
  className?: string
}

const MaterialCompositeImage = ({
  material,
  className,
}: {
  material: SustainabilityMaterialDetail
  className?: string
}) => {
  return (
    <figure
      className={cn(
        "grid aspect-[4/3] grid-cols-2 overflow-hidden bg-muted",
        className
      )}
      aria-label={material.imageAlt}
    >
      <div className="relative h-full w-full">
        <Image
          src={material.image}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="relative h-full w-full">
        <Image
          src={material.secondaryImage}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
    </figure>
  )
}

export const MaterialsList = ({ className }: MaterialsListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>("wool")

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <div className={cn("mt-10 space-y-10 md:mt-16 md:space-y-24", className)}>
      {SUSTAINABILITY_MATERIAL_DETAILS.map((material) => {
        const imageFirst = material.imagePosition === "left"
        const isExpanded = expandedId === material.id

        return (
          <article key={material.id} id={material.id} className="scroll-mt-24">
            <div className="md:hidden">
              <h2 className="text-xl font-semibold text-brand-navy">{material.title}</h2>
              <MaterialCompositeImage material={material} className="mt-4" />
              <p className="mt-4 text-sm leading-[1.8] capitalize text-brand-navy">
                {isExpanded ? material.body : material.preview}
              </p>
              <button
                type="button"
                onClick={() => handleToggle(material.id)}
                aria-expanded={isExpanded}
                aria-controls={`${material.id}-body`}
                className="mt-3 inline-flex items-center gap-1 text-sm text-brand-navy-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {isExpanded ? (
                  <>
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Read Less
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <span id={`${material.id}-body`} className="sr-only">
                {isExpanded ? "Expanded" : "Collapsed"}
              </span>
            </div>

            <div className="hidden items-center gap-12 md:grid md:grid-cols-2 lg:gap-16">
              <MaterialCompositeImage
                material={material}
                className={cn(
                  "aspect-[3/4]",
                  imageFirst ? "md:order-1" : "md:order-2"
                )}
              />
              <div
                className={cn(
                  "max-w-md",
                  imageFirst ? "md:order-2" : "md:order-1 md:justify-self-end"
                )}
              >
                <h2 className="text-[1.75rem] font-semibold text-brand-navy md:text-[2rem]">
                  {material.title}
                </h2>
                <p className="mt-4 text-sm leading-[1.8] capitalize text-brand-navy-muted md:text-base md:normal-case">
                  {material.body}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
