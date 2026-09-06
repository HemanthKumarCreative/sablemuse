import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import type { ModiWeekDay } from "@/data/home"

type ModiWeekSectionProps = {
  days: ModiWeekDay[]
}

const daySlug = (day: string) => day.toLowerCase()

export const ModiWeekSection = ({ days }: ModiWeekSectionProps) => {
  return (
    <section aria-labelledby="modiweek-heading" className="pb-10 md:pb-16">
      <Container>
        <SectionHeader
          title="ModiWeek"
          href="/modiweek"
          titleClassName="font-sans"
          titleId="modiweek-heading"
        />
        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-thin md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
          {days.slice(0, 4).map((item) => (
            <article key={item.day} className="w-[46vw] shrink-0 md:w-auto">
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
                    sizes="(max-width: 768px) 46vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="pt-4 font-semibold text-ink">{item.day}</p>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-2 md:hidden" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={index}
              className={`size-2 rounded-full ${index === 0 ? "bg-brand" : "bg-[#adadad]"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
