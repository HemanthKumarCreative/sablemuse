import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
    <section aria-labelledby="hero-heading" className="bg-background md:bg-[#c9b59c]">
      <div className="relative">
        <Image
          src="/images/hero.jpg"
          alt="Two women in black clothing beside a marble fireplace"
          width={2880}
          height={1200}
          priority
          sizes="100vw"
          className="h-[28rem] w-full object-cover object-[68%_center] sm:h-[34rem] md:h-auto md:object-center"
        />
        <div className="bg-background px-4 py-6 sm:px-5 md:absolute md:inset-y-0 md:left-0 md:z-10 md:flex md:w-[40%] md:items-center md:bg-transparent md:px-8 md:py-0 lg:w-[min(40%,28rem)] lg:px-14">
          <div>
            <h1
              id="hero-heading"
              className="font-serif text-[1.75rem] font-medium leading-[1.15] tracking-[0.01em] text-ink sm:text-[2rem] md:text-[1.5rem] lg:text-[2.35rem]"
            >
              Everyday women&apos;s clothing
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink md:mt-3 md:text-base">
              Soft silhouettes for the days you want to feel pulled together.
            </p>
            <Button
              render={<Link href="/collection/new-arrivals" />}
              nativeButton={false}
              size="xl"
              className="mt-4 h-12 min-h-12 border border-brand-border bg-background px-8 text-sm font-medium normal-case tracking-normal text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-background focus-visible:border-ink md:mt-5 md:px-10 lg:px-14 lg:text-base"
            >
              Shop New Arrivals
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
