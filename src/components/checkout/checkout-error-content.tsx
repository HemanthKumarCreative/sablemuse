import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

export const CheckoutErrorContent = () => {
  return (
    <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-2 text-center">
          <div
            className="flex size-[88px] items-center justify-center rounded-none bg-destructive md:size-24"
            aria-hidden="true"
          >
            <span className="text-4xl font-semibold leading-none text-background md:text-5xl">
              !
            </span>
          </div>

          <h1 className="heading-page mt-8 capitalize leading-tight text-destructive">
            Sorry, Payment Failed
          </h1>

          <p className="mt-6 max-w-xl text-base leading-copy capitalize text-brand-navy md:text-lg">
            Unfortunately, Your Order Cannot Be Completed. Please Ensure That
            The Billing Address You Provided Is The Same One Where Your
            Debit/Credit Card Is Registered. Alternatively, Please Try A
            Different Payment Method.
          </p>

          <Button
            render={<Link href="/checkout/payment" />}
            size="xl"
            className="mt-10 w-full max-w-[280px]"
          >
            Retry
          </Button>

          <Link
            href="/cart"
            className="mt-6 text-sm text-brand-navy underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-base"
          >
            &lt; Back To My Order
          </Link>
        </div>
      </Container>
    </section>
  )
}
