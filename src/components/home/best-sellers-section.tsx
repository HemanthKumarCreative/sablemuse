import { Container } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/data/home"

type BestSellersSectionProps = {
  products: Product[]
}

export const BestSellersSection = ({ products }: BestSellersSectionProps) => {
  return (
    <section aria-labelledby="best-sellers-heading">
      <Container>
        <SectionHeader
          title="Best Sellers"
          href="/collection/best-sellers"
          titleClassName="font-sans"
          titleId="best-sellers-heading"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}
