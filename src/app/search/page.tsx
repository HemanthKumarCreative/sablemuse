import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { SearchActiveChips } from "@/components/search/search-active-chips"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersMobile } from "@/components/search/search-filters-mobile"
import { SearchResultsBar } from "@/components/search/search-results-bar"
import { Container } from "@/components/shared/container"
import { getSearchResults } from "@/data/search"

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

const resolveQuery = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? ""
  }

  return value?.trim() ?? ""
}

export const generateMetadata = async ({
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  const query = resolveQuery((await searchParams).q)
  const title = query ? `Search: ${query}` : "Search"
  const description = query
    ? `Shop Modimal results for “${query}” — women’s clothing and essentials.`
    : "Search Modimal women’s clothing, collections, and essentials."

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Modimal`,
      description,
    },
    alternates: {
      canonical: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    },
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = resolveQuery((await searchParams).q)
  const products = query ? getSearchResults(query) : []
  const itemCount = products.length

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search results for ${query}`,
    description: `Modimal search results for ${query}`,
    url: `/search?q=${encodeURIComponent(query)}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemCount,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `/product/${product.id}`,
        name: `${product.name} ${product.subtitle}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="search-results-heading" className="pb-12 md:pb-24">
        <Container>
          <h1 id="search-results-heading" className="sr-only">
            Search results for {query}
          </h1>

          <SearchResultsBar initialQuery={query} className="mt-4 md:mt-8" />

          <p
            className="sr-only mt-5 text-center text-lg capitalize leading-[1.8] text-ink sm:text-xl md:mt-8 lg:not-sr-only"
            aria-live="polite"
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>

          <SearchFiltersMobile className="mt-5" />
          <SearchActiveChips
            className="mt-4 lg:hidden"
            groupIds={["size", "collection"]}
          />

          <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-start lg:gap-6">
            <SearchFilters className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[392px]" />

            <div className="min-w-0 flex-1">
              {itemCount === 0 ? (
                <p className="text-base text-ink-muted">
                  {query
                    ? `No products matched “${query}”. Try another search.`
                    : "Enter a search term to see products."}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default SearchPage
