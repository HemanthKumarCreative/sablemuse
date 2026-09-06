import type { Metadata } from "next"
import Image from "next/image"
import { RegisterForm } from "@/components/auth/register-form"
import { Container } from "@/components/shared/container"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Modimal account to shop women’s clothing, track orders, and save favorites.",
  openGraph: {
    title: "Create Account | Modimal",
    description:
      "Join Modimal — register for a cleaner, simpler way to shop women’s essentials.",
    images: ["/images/auth/register.jpg"],
  },
  alternates: {
    canonical: "/register",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Create Account",
  description: "Register for a Modimal account",
  url: "/register",
}

const RegisterPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="register-heading" className="pb-16 md:pb-24">
        <h2 id="register-heading" className="sr-only">
          Create Account
        </h2>

        <div className="relative aspect-[390/280] w-full overflow-hidden bg-muted sm:aspect-[16/10] lg:hidden">
          <Image
            src="/images/auth/register.jpg"
            alt="Modimal model in a white shirt and dark trousers seated by a window"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <Container className="mt-8 md:mt-10 lg:mt-12">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="relative hidden min-h-[720px] overflow-hidden bg-muted lg:block">
              <Image
                src="/images/auth/register.jpg"
                alt="Modimal model in a white shirt and dark trousers seated by a window"
                fill
                priority
                sizes="50vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex items-center lg:py-8">
              <RegisterForm className="mx-auto w-full max-w-[480px]" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default RegisterPage
