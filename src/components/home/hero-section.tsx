import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const HERO_COPY = (
  <>
    <h1
      id="hero-heading"
      className="font-serif text-[1.75rem] font-medium leading-[1.1] tracking-[0.01em] text-ink sm:text-[2.25rem] lg:text-[3rem]"
    >
      Women&apos;s clothing,
      <br />
      shipped free in the US
    </h1>
    <Button
      render={<Link href="/collection/new-arrivals" />}
      nativeButton={false}
      size="xl"
      className="mt-4 h-auto border border-brand-border bg-background px-6 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted sm:px-8 sm:text-base lg:mt-5 lg:px-14"
    >
      Shop New Arrivals
    </Button>
  </>
)

export const HeroSection = () => {
  return (
    <section aria-labelledby="hero-heading" className="bg-background lg:bg-[#c9b59c]">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pt-24 pb-6 sm:px-8 sm:pb-8 lg:inset-y-0 lg:right-auto lg:flex lg:w-[min(40%,28rem)] lg:items-center lg:px-14 lg:py-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/45 to-transparent lg:hidden"
          />
          <div className="relative">{HERO_COPY}</div>
        </div>
        <Image
          src="/images/sustainability/lifestyle.png"
          alt="A woman in a white dress standing on pale steps"
          width={784}
          height={876}
          priority
          sizes="100vw"
          className="h-auto w-full lg:hidden"
        />
        <Image
          src="/images/hero.jpg"
          alt="Two women in black clothing beside a marble fireplace"
          width={2880}
          height={1200}
          priority
          sizes="100vw"
          className="hidden h-auto w-full lg:block"
        />
      </div>
    </section>
  )
}
