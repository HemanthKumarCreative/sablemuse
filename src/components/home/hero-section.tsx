import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[420px] w-full md:min-h-[560px] lg:min-h-[600px]">
        <Image
          src="/images/hero.jpg"
          alt="Two models wearing Modimal black dresses in an elegant interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
        <div className="absolute top-[67%] left-[4%] z-10 max-w-[280px] md:top-1/2 md:left-[10%] md:max-w-md md:-translate-y-1/2">
          <h1
            id="hero-heading"
            className="font-heading text-[1.6rem] leading-[1.75] text-ink md:text-[2.4rem]"
          >
            Elegance in simplicity,
            <br />
            Earth’s Harmony
          </h1>
          <Button
            render={<Link href="/new-in" />}
            nativeButton={false}
            className="mt-4 h-auto rounded-none bg-white px-8 py-2.5 text-base font-medium text-ink hover:bg-white/90 md:px-14"
          >
            New In
          </Button>
        </div>
      </div>
    </section>
  )
}
