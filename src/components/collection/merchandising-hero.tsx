import { CategoryCard } from "@/components/collection/category-card"
import { Container } from "@/components/shared/container"
import type { MegaMenuLink } from "@/data/navigation"

type MerchandisingCategory = MegaMenuLink & {
  image?: string
  alt?: string
}

type MerchandisingHeroProps = {
  eyebrow: string
  title: string
  titleId: string
  description: string
  categories: MerchandisingCategory[]
}

export const MerchandisingHero = ({
  eyebrow,
  title,
  titleId,
  description,
  categories,
}: MerchandisingHeroProps) => {
  return (
    <section aria-labelledby={titleId} className="pb-10">
      <Container>
        <div className="mt-10 mb-8 md:mt-16 md:mb-10">
          <p className="mb-2 text-sm font-medium tracking-eyebrow text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h1 id={titleId} className="heading-page">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-brand-navy-muted md:text-base">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.href} item={category} />
          ))}
        </div>
      </Container>
    </section>
  )
}
