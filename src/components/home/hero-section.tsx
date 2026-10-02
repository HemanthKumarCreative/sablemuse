import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[480px] w-full sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
          alt="Two models wearing Modimal black dresses in an elegant interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[28%_30%] sm:object-[30%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/10 to-transparent" />
        <div className="absolute bottom-10 left-5 z-10 max-w-[240px] sm:bottom-14 sm:left-6 sm:max-w-[280px] md:top-1/2 md:bottom-auto md:left-[10%] md:max-w-md md:-translate-y-1/2">
          <h1
            id="hero-heading"
            className="heading-page"
          >
            Elegance in simplicity,
            <br />
            Earth’s Harmony
          </h1>
          <Button
            render={<Link href="/new-in" />}
            nativeButton={false}
            size="xl"
            className="mt-4 h-auto bg-background px-8 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted sm:text-base md:mt-4 md:px-14"
          >
            New In
          </Button>
        </div>
      </div>
    </section>
  )
}
