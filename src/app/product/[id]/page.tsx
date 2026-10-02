import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductAccordions } from "@/components/product/product-accordions"
import { ProductCard } from "@/components/product/product-card"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { ScrollCarousel } from "@/components/shared/scroll-carousel"
import { SectionHeader } from "@/components/shared/section-header"
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from "@/lib/shopify"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Product",
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Sable Muse`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const related = product.gid
    ? await getProductRecommendations(product.gid, 4)
    : await getProducts(4)

  const placeAccordionsUnderGallery = product.accordionPlacement === "gallery"
  const accordionDefaultOpen = product.accordionDefaultOpen

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery.map((item) =>
      item.type === "image" ? item.url : item.poster
    ).filter((url): url is string => Boolean(url)),
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Sable Muse",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currencyCode ?? "USD",
      price: product.price,
      availability: (product.variants ?? []).some(
        (variant) => variant.availableForSale
      )
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `/product/${product.id}`,
    },
  }

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

          <h2 id="product-heading" className="sr-only">
            {product.name}
          </h2>

          <div className="mt-5 grid gap-8 md:mt-8 md:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <ProductGallery
                media={product.gallery}
                alt={`${product.name} ${product.subtitle}`}
              />
              {placeAccordionsUnderGallery ? (
                <ProductAccordions
                  product={product}
                  defaultOpen={accordionDefaultOpen}
                  className="mt-8 hidden lg:block"
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <ProductPurchasePanel
                product={product}
                showAccordions={!placeAccordionsUnderGallery}
              />
              {placeAccordionsUnderGallery ? (
                <ProductAccordions
                  product={product}
                  defaultOpen={accordionDefaultOpen}
                  className="mt-10 lg:hidden"
                />
              ) : null}
            </div>
          </div>
        </Container>
      </section>

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
          <ScrollCarousel
            itemCount={related.length}
            ariaLabel="You may also like"
            className="md:hidden"
            trackClassName="gap-3"
            dotsClassName="hidden"
          >
            {related.map((item) => (
              <div
                key={item.id}
                className="w-[68%] shrink-0 snap-start sm:w-[55%]"
              >
                <ProductCard
                  product={item}
                  imageAspectClassName="aspect-[3/4]"
                />
              </div>
            ))}
          </ScrollCarousel>
          <div className="hidden grid-cols-2 gap-4 md:grid md:grid-cols-3 md:gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                imageAspectClassName="aspect-[392/438]"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProductPage
