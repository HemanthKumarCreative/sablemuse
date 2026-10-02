import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const SustainabilitySection = () => {
  return (
    <section
      aria-labelledby="sustainability-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[360px] w-full sm:min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
        <Image
          src="/images/sustainability.png"
          alt="Sustainable fashion lifestyle imagery for Modimal"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-end gap-3 p-5 text-right sm:gap-4 sm:p-6 md:right-8 md:bottom-16 md:left-auto md:max-w-md md:p-8">
          <p
            id="sustainability-heading"
            className="max-w-[280px] text-sm leading-copy text-brand-navy sm:max-w-sm md:max-w-none md:text-base"
          >
            Stylish sustainability in clothing promotes eco-friendly choices for
            a greater future
          </p>
          <Button
            render={<Link href="/sustainability" />}
            nativeButton={false}
            size="xl"
            className="h-auto bg-background px-6 py-2.5 font-medium normal-case tracking-normal text-ink hover:bg-muted sm:px-8 sm:text-base"
          >
            Sustainability
          </Button>
        </div>
      </div>
    </section>
  )
}
