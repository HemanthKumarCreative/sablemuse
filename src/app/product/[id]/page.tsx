import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductCardRail } from "@/components/product/product-card-rail"
import { Button } from "@/components/ui/button"
import { ProductExperience } from "@/components/product/product-experience"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { productMetaDescription } from "@/lib/shopify/description"
import { exactVariant, selectionFromQuery } from "@/lib/product-selection"
import { getProduct, getProductRecommendations } from "@/lib/shopify"
import type { ProductDetail } from "@/types/commerce"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    color?: string | string[]
    size?: string | string[]
  }>
}

const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const siteOrigin = () =>
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { id } = await params
  const result = await getProduct(id)

  if (result.status !== "ready") {
    return {
      title: result.status === "error" ? "Product unavailable" : "Product",
    }
  }

  const product = result.product
  const description = productMetaDescription(
    product.prose,
    product.name,
    product.specs
  )

  return {
    title: product.name,
    description,
    openGraph: {
      title: `${product.name} | Sable Muse`,
      description,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Sable Muse`,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
  }
}

const productJsonLd = (
  product: ProductDetail,
  query: { color?: string; size?: string }
) => {
  const origin = siteOrigin()
  const productUrl = `${origin}/product/${product.id}`
  const images = product.gallery
    .map((item) => (item.type === "image" ? item.url : item.poster))
    .filter((url): url is string => Boolean(url))
  const selected = selectionFromQuery(product, query)
  const exact = exactVariant(product, selected)
  const inStock = exact
    ? exact.availableForSale
    : (product.variants ?? []).some((variant) => variant.availableForSale)
  const availability = inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock"
  const currency = exact?.currencyCode ?? product.currencyCode ?? "USD"
  const ranged = Boolean(product.priceMax && product.priceMax > product.price)
  const offers = exact
    ? {
        "@type": "Offer",
        price: exact.price.toFixed(2),
        priceCurrency: currency,
        availability,
        url: productUrl,
      }
    : ranged
    ? {
        "@type": "AggregateOffer",
        lowPrice: product.price.toFixed(2),
        highPrice: (product.priceMax ?? product.price).toFixed(2),
        offerCount: product.variants?.length ?? 1,
        priceCurrency: currency,
        availability,
        url: productUrl,
      }
    : {
        "@type": "Offer",
        price: product.price.toFixed(2),
        priceCurrency: currency,
        availability,
        url: productUrl,
      }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: productMetaDescription(
          product.prose,
          product.name,
          product.specs
        ),
        image: images,
        brand: {
          "@type": "Brand",
          name: "Sable Muse",
        },
        offers,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: origin,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.category,
            item: `${origin}${product.categoryHref}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  }
}

const ProductUnavailable = ({ handle }: { handle: string }) => (
  <section className="pb-16 md:pb-24">
    <Container>
      <h1 className="heading-page mt-10">This product is unavailable right now</h1>
      <p className="mt-4 max-w-xl text-sm leading-copy text-brand-navy">
        The product catalog did not respond. This is not a missing product. Please try again.
      </p>
      <Button
        render={<a href={`/product/${handle}`} />}
        nativeButton={false}
        size="xl"
        className="mt-6"
      >
        Try again
      </Button>
    </Container>
  </section>
)

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { id } = await params
  const query = await searchParams
  const initialQuery = {
    color: firstParam(query.color),
    size: firstParam(query.size),
  }
  const result = await getProduct(id)

  if (result.status === "missing") {
    notFound()
  }

  if (result.status === "error") {
    return <ProductUnavailable handle={id} />
  }

  const product = result.product
  const related = product.gid
    ? await getProductRecommendations(product.gid, 4)
    : []
  const jsonLd = productJsonLd(product, initialQuery)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="product-heading" className="pb-16 md:pb-24">
        <Container>
          <Breadcrumbs
            className="mt-4 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: product.category, href: product.categoryHref },
              { label: product.name },
            ]}
          />
          <ProductExperience
            key={product.id}
            product={product}
            initialQuery={initialQuery}
          />
        </Container>
      </section>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-products-heading"
          className="pb-16 md:pb-24"
        >
          <Container>
            <SectionHeader
              title="You May Also Like"
              titleId="related-products-heading"
              className="mt-0"
              titleClassName="heading-section"
            />
            <ProductCardRail
              products={related}
              ariaLabel="You may also like"
              imageAspectClassName="aspect-[3/4] md:aspect-[392/438]"
              gridClassName="md:grid-cols-3 md:gap-6"
              itemClassName="w-[68%] sm:w-[55%]"
            />
          </Container>
        </section>
      ) : null}
    </>
  )
}

export default ProductPage
