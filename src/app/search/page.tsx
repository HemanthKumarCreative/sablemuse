import type { Metadata } from "next"
import { Suspense } from "react"
import { CatalogBrowser } from "@/components/catalog/catalog-browser"
import { SearchResultsBar } from "@/components/search/search-results-bar"
import { Container } from "@/components/shared/container"
import { parseCatalogFilters, parseCatalogSort } from "@/lib/catalog-params"
import { getCatalogPage } from "@/lib/shopify/catalog"

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[]
    sort?: string | string[]
    filter?: string | string[]
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
  const params = await searchParams
  const query = resolveQuery(params.q)
  const sort = parseCatalogSort(params.sort)
  const selectedFilters = !params.filter
    ? []
    : Array.isArray(params.filter)
      ? params.filter
      : [params.filter]
  const page = query
    ? await getCatalogPage({
        source: { kind: "search", query },
        sort,
        filters: parseCatalogFilters(params.filter),
      })
    : null

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

        {!query || !page ? (
          <p className="mt-8 text-base text-brand-navy-muted">
            Enter a search term to find Sable Muse products.
          </p>
        ) : (
          <Suspense>
            <CatalogBrowser
              key={`${query}:${sort}:${selectedFilters.join("|")}`}
              page={page}
              sort={sort}
              selectedFilters={selectedFilters}
              source={{ kind: "search", query }}
              emptyLabel={`No products found for “${query}”.`}
              headingId="search-filters-heading"
            />
          </Suspense>
        )}
      </Container>
    </section>
  )
}

export default SearchPage
