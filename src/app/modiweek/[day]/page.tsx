import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  ModiweekDayNav,
  ModiweekLookSection,
} from "@/components/modiweek/modiweek-sections"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import {
  getModiweekDay,
  MODIWEEK_DAYS,
} from "@/data/modiweek"

type ModiweekDayPageProps = {
  params: Promise<{
    day: string
  }>
}

export const generateStaticParams = () => {
  return MODIWEEK_DAYS.map((day) => ({ day: day.slug }))
}

export const generateMetadata = async ({
  params,
}: ModiweekDayPageProps): Promise<Metadata> => {
  const { day: daySlug } = await params
  const day = getModiweekDay(daySlug)

  if (!day) {
    return { title: "ModiWeek" }
  }

  return {
    title: `${day.day} | ModiWeek`,
    description: `Shop the ModiWeek ${day.day} look — curated Modimal outfits and pieces.`,
    openGraph: {
      title: `ModiWeek ${day.day} | Modimal`,
      description: `Explore the ModiWeek ${day.day} look and shop the pieces.`,
      images: [day.heroImage],
    },
    alternates: {
      canonical: `/modiweek/${day.slug}`,
    },
  }
}

const ModiweekDayPage = async ({ params }: ModiweekDayPageProps) => {
  const { day: daySlug } = await params
  const day = getModiweekDay(daySlug)

  if (!day) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `ModiWeek ${day.day}`,
    description: `Shop the ModiWeek ${day.day} look`,
    url: `/modiweek/${day.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="modiweek-day-heading" className="pb-16 md:pb-24">
        <Container>
          <Breadcrumbs
            className="mt-4 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Modiweek", href: "/modiweek" },
            ]}
          />

          <h1
            id="modiweek-day-heading"
            className="mt-6 text-[2rem] font-bold capitalize leading-none text-brand-navy md:mt-10 md:font-display md:text-[4.5rem] md:italic"
          >
            {day.day}
          </h1>

          <ModiweekLookSection day={day} className="mt-6 md:mt-10" />

          <div className="mt-14 md:mt-20">
            <h2 className="mb-6 text-xl font-bold capitalize text-brand-navy md:text-2xl">
              More Days
            </h2>
            <ModiweekDayNav activeSlug={day.slug} />
          </div>
        </Container>
      </section>
    </>
  )
}

export default ModiweekDayPage
