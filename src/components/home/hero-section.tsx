import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const HERO_COPY = (
  <>
    <h1
      id="hero-heading"
      className="font-serif text-[1.05rem] font-medium leading-[1.15] tracking-[0.01em] text-ink sm:text-[1.5rem] lg:text-[2.35rem]"
    >
      Elevated essentials,
      <br />
      made to last
    </h1>
    <Button
      render={<Link href="/collection/new-arrivals" />}
      nativeButton={false}
      size="xl"
      className="mt-3 h-auto border border-brand-border bg-background px-3 py-2 text-xs font-medium normal-case tracking-normal text-ink hover:bg-muted sm:mt-4 sm:px-6 sm:py-2.5 sm:text-sm lg:mt-5 lg:px-14 lg:text-base"
    >
      Shop New Arrivals
    </Button>
  </>
)

export const HeroSection = () => {
  return (
    <section aria-labelledby="hero-heading" className="bg-[#c9b59c]">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 flex w-[34%] items-center px-3 sm:w-[40%] sm:px-8 lg:w-[min(40%,28rem)] lg:px-14">
          <div>{HERO_COPY}</div>
        </div>
        <Image
          src="/images/hero.jpg"
          alt="Two women in black clothing beside a marble fireplace"
          width={2880}
          height={1200}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  )
}
