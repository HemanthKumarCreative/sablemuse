import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductAccordions } from "@/components/product/product-accordions"
import { ProductCard } from "@/components/product/product-card"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import {
  RELATED_PRODUCTS,
  getProductById,
  PRODUCTS,
} from "@/data/products"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateStaticParams = () => {
  return Object.keys(PRODUCTS).map((id) => ({ id }))
}

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { id } = await params
  const product = getProductById(id)

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
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const placeAccordionsUnderGallery = product.accordionPlacement === "gallery"

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
            className="mt-6 md:mt-8"
            items={[
              { label: "Home", href: "/" },
              { label: product.category, href: product.categoryHref },
              { label: product.name },
            ]}
          />

          <h2 id="product-heading" className="sr-only">
            {product.name}
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <ProductGallery
                images={product.gallery}
                alt={`${product.name} ${product.subtitle}`}
              />
              {placeAccordionsUnderGallery ? (
                <ProductAccordions
                  product={product}
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
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
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
