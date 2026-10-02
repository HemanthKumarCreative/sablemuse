import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type HeroSectionProps = {
  image?: string
  imageAlt: string
}

export const HeroSection = ({ image, imageAlt }: HeroSectionProps) => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[480px] w-full bg-muted sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/10 to-transparent" />
        <div className="absolute bottom-10 left-5 z-10 max-w-[260px] sm:bottom-14 sm:left-6 sm:max-w-[320px] md:top-1/2 md:bottom-auto md:left-[10%] md:max-w-md md:-translate-y-1/2">
          <h1 id="hero-heading" className="heading-page">
            Everyday women&apos;s clothing,
            <br />
            for the United States
          </h1>
          <Button
            render={<Link href="/collection/new-arrivals" />}
            nativeButton={false}
            size="xl"
            className="mt-4 h-auto bg-background px-8 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted sm:text-base md:mt-4 md:px-14"
          >
            Shop New Arrivals
          </Button>
        </div>
      </div>
    </section>
  )
}
