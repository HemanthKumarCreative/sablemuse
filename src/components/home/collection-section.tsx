import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import type { CollectionTile } from "@/data/home"
import { Button } from "@/components/ui/button"

type CollectionSectionProps = {
  collections: CollectionTile[]
}

export const CollectionSection = ({ collections }: CollectionSectionProps) => {
  return (
    <section aria-labelledby="collection-heading">
      <Container>
        <SectionHeader
          title="Collection"
          titleClassName="font-sans"
          titleId="collection-heading"
        />
        <div className="columns-2 gap-2 md:gap-6 [column-fill:_balance]">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative mb-2 block break-inside-avoid md:mb-6"
              aria-label={`Shop ${item.name}`}
            >
              <div className={`relative w-full overflow-hidden bg-muted ${item.heightClass}`}>
                <Image
                  src={item.image}
                  alt={`${item.name} collection`}
                  fill
                  sizes="(max-width: 768px) 50vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <span className="mt-2 block text-sm text-ink md:hidden">
                {item.name}
              </span>
              <Button
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute right-6 bottom-8 hidden rounded-none bg-white px-10 py-2.5 text-base font-medium capitalize text-ink hover:bg-white md:inline-flex"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
