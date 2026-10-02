import Image from "next/image"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { FOLLOW_US } from "@/data/home"
import { cn } from "cn"

export const FollowUsSection = () => {
  return (
    <section aria-labelledby="follow-us-heading" className="pb-12 md:pb-20">
      <Container>
        <SectionHeader
          title="Follow us @modimal"
          titleId="follow-us-heading"
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:auto-rows-[315px] md:gap-0">
          {FOLLOW_US.map((item, index) => (
            <figure
              key={item.id}
              className={cn(
                "relative overflow-hidden bg-muted",
                index === 0
                  ? "col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto md:min-h-0"
                  : "aspect-square md:aspect-auto md:min-h-0"
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
