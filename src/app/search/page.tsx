import type { Metadata } from "next"
import { ProductCard } from "@/components/product/product-card"
import { SearchActiveChips } from "@/components/search/search-active-chips"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchFiltersMobile } from "@/components/search/search-filters-mobile"
import { SearchResultsBar } from "@/components/search/search-results-bar"
import { Container } from "@/components/shared/container"
import { SEARCH_FILTERS } from "@/data/search"
import { searchProducts } from "@/lib/shopify/queries/search"

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
    ? `Shop Sable Muse results for “${query}”. Prices are in US dollars.`
    : "Search Sable Muse women's clothing and collections."

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Sable Muse`,
      description,
    },
    alternates: {
      canonical: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    },
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = resolveQuery((await searchParams).q)
  const products = query ? await searchProducts(query) : []
  const itemCount = products.length

  return (
    <section aria-labelledby="search-heading" className="pb-12 md:pb-24">
      <Container>
        <h1 id="search-heading" className="sr-only">
          Search results
        </h1>

        <SearchResultsBar
          className="mt-6 md:mt-10"
          initialQuery={query}
        />

        <SearchActiveChips className="mt-4" />

        <SearchFiltersMobile
          className="mt-5 lg:mt-6"
          filters={SEARCH_FILTERS}
          headingId="search-mobile-filters-heading"
        />

        <div className="mt-5 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-start lg:gap-6">
          <SearchFilters
            className="hidden w-full shrink-0 lg:sticky lg:top-[120px] lg:block lg:w-[320px] xl:w-[392px]"
            filters={SEARCH_FILTERS}
            headingId="search-filters-heading"
          />

          <div className="min-w-0 flex-1">
            {!query ? (
              <p className="text-base text-brand-navy-muted">
                Enter a search term to find Sable Muse products.
              </p>
            ) : itemCount === 0 ? (
              <p className="text-base text-brand-navy-muted">
                No products found for “{query}”.
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
  )
}

export default SearchPage
