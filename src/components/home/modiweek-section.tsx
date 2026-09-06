"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import type { ModiWeekDay } from "@/data/home"

type ModiWeekSectionProps = {
  days: ModiWeekDay[]
}

const daySlug = (day: string) => day.toLowerCase()

export const ModiWeekSection = ({ days }: ModiWeekSectionProps) => {
  const desktopDays = days.slice(0, 4)

  return (
    <section aria-labelledby="modiweek-heading" className="pb-8 md:pb-16">
      <Container>
        <SectionHeader
          title="ModiWeek"
          href="/modiweek"
          titleClassName="font-sans"
          titleId="modiweek-heading"
        />

        <div className="hidden md:grid md:grid-cols-4 md:gap-5">
          {desktopDays.map((item) => (
            <article key={item.day}>
              <Link
                href={`/modiweek/${daySlug(item.day)}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label={`View ModiWeek ${item.day}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={`ModiWeek look for ${item.day}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="pt-4 font-semibold text-ink">{item.day}</p>
              </Link>
            </article>
          ))}
        </div>

        <div className="md:hidden">
          <ScrollCarousel
            itemCount={days.length}
            ariaLabel="ModiWeek looks"
            trackClassName="gap-3"
          >
            {days.map((item) => (
              <article
                key={item.day}
                className="w-[42vw] max-w-[180px] shrink-0 snap-start"
              >
                <Link
                  href={`/modiweek/${daySlug(item.day)}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label={`View ModiWeek ${item.day}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={`ModiWeek look for ${item.day}`}
                      fill
                      sizes="42vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="pt-3 text-sm font-semibold text-ink">{item.day}</p>
                </Link>
              </article>
            ))}
          </ScrollCarousel>
        </div>
      </Container>
    </section>
  )
}
