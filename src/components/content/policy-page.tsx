import type { ReactNode } from "react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Container } from "@/components/shared/container"

type PolicyPageProps = {
  title: string
  children: ReactNode
}

export const PolicyPage = ({ title, children }: PolicyPageProps) => {
  return (
    <section aria-labelledby="policy-heading" className="pb-16 md:pb-24">
      <div className="border-b border-brand-border bg-muted lg:border-0 lg:bg-transparent">
        <Container>
          <Breadcrumbs
            className="py-3 lg:mt-8 lg:py-0"
            items={[{ label: "Home", href: "/" }, { label: title }]}
          />
        </Container>
      </div>
      <Container>
        <h1 id="policy-heading" className="heading-page mt-8 md:mt-10">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-sm leading-copy text-brand-navy md:mt-10 md:text-base">
          {children}
        </div>
      </Container>
    </section>
  )
}
