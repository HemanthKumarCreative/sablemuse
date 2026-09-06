import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const SustainabilitySection = () => {
  return (
    <section
      aria-labelledby="sustainability-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="relative min-h-[320px] w-full md:min-h-[520px] lg:min-h-[600px]">
        <Image
          src="/images/sustainability.png"
          alt="Sustainable fashion lifestyle imagery for Modimal"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute right-5 bottom-4 z-10 flex max-w-sm flex-col items-end gap-4 p-4 text-right md:right-8 md:bottom-16 md:max-w-md md:p-8">
          <p
            id="sustainability-heading"
            className="text-sm leading-relaxed text-ink md:text-base"
          >
            Stylish sustainability in clothing promotes eco-friendly choices for
            a greater future
          </p>
          <Button
            render={<Link href="/sustainability" />}
            nativeButton={false}
            className="h-auto rounded-none bg-white px-8 py-2.5 text-base font-medium text-ink hover:bg-white/90"
          >
            Sustainability
          </Button>
        </div>
      </div>
    </section>
  )
}
