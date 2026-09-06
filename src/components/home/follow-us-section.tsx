import Image from "next/image"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { FOLLOW_US } from "@/data/home"
import { cn } from "cn"

export const FollowUsSection = () => {
  return (
    <section aria-labelledby="follow-us-heading" className="pb-16 md:pb-20">
      <Container>
        <SectionHeader
          title="Follow us @modimal"
          titleClassName="font-sans"
          titleId="follow-us-heading"
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:auto-rows-[315px] md:gap-0">
          {FOLLOW_US.map((item, index) => (
            <figure
              key={item.id}
              className={cn(
                "relative overflow-hidden bg-muted",
                index === 0
                  ? "col-span-2 min-h-[280px] md:col-span-1 md:row-span-2 md:min-h-0"
                  : "min-h-[160px] md:min-h-0"
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
