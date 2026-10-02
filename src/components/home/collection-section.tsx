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
          titleId="collection-heading"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Shop ${item.name}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={`${item.name} collection`}
                  fill
                  sizes="(max-width: 768px) 50vw, 40vw"
                  className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <span className="mt-2 block text-sm text-brand-navy md:hidden">
                {item.name}
              </span>
              <Button
                tabIndex={-1}
                aria-hidden="true"
                size="xl"
                className="pointer-events-none absolute right-3 bottom-3 hidden h-auto max-w-[calc(100%-1.5rem)] bg-background px-4 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted md:right-6 md:bottom-6 md:inline-flex md:px-6"
              >
                <span className="truncate">{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
