import type { Metadata } from "next"
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"
import { Container } from "@/components/shared/container"

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in to your Modimal account to shop women’s clothing, track orders, and manage your wish list.",
  openGraph: {
    title: "Log In | Modimal",
    description:
      "Sign in to Modimal — access your account, orders, and saved favorites.",
    images: ["/images/auth/register.jpg"],
  },
  alternates: {
    canonical: "/login",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Log In",
  description: "Sign in to your Modimal account",
  url: "/login",
}

const LoginPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-labelledby="login-heading" className="pb-16 md:pb-24">
        <h2 id="login-heading" className="sr-only">
          Log In
        </h2>

        <Container className="mt-8 md:mt-12">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="relative min-h-[420px] overflow-hidden bg-muted lg:min-h-[720px]">
              <Image
                src="/images/auth/register.jpg"
                alt="Modimal model in a white shirt and dark trousers seated by a window"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex items-center lg:py-8">
              <LoginForm className="mx-auto w-full max-w-[480px]" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default LoginPage
