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
  RELATED_PRODUCTS,
  getProductById as getMockProductById,
} from "@/data/products"
import { getProduct } from "@/lib/shopify/queries/product"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}



export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { id } = await params
  let product = await getProduct(id)
  
  if (!product) {
    product = getMockProductById(id)
  }

  if (!product) {
    return {
      title: "Product",
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Modimal`,
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
  let product = await getProduct(id)
  
  if (!product) {
    product = getMockProductById(id)
  }

  if (!product) {
    notFound()
  }

  const placeAccordionsUnderGallery = product.accordionPlacement === "gallery"
  const accordionDefaultOpen = product.accordionDefaultOpen

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Modimal",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
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
                images={product.gallery}
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
            titleClassName="text-[1.75rem] font-bold md:text-[2.1rem]"
          />
          <ScrollCarousel
            itemCount={RELATED_PRODUCTS.length}
            ariaLabel="You may also like"
            className="md:hidden"
            trackClassName="gap-3"
            dotsClassName="hidden"
          >
            {RELATED_PRODUCTS.map((item) => (
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
            {RELATED_PRODUCTS.map((item) => (
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
