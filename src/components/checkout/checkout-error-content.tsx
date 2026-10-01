import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

export const CheckoutErrorContent = () => {
  return (
    <section className="flex flex-1 flex-col justify-center py-16 md:py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-2 text-center">
          <div
            className="flex size-[88px] items-center justify-center rounded-full bg-[#CA2929] md:size-24"
            aria-hidden="true"
          >
            <span className="text-4xl font-semibold leading-none text-white md:text-5xl">
              !
            </span>
          </div>

          <h1 className="mt-8 text-[2rem] font-semibold capitalize leading-tight text-[#CA2929] md:text-[2.5rem]">
            Sorry, Payment Failed
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.8] capitalize text-brand-navy md:text-lg">
            Unfortunately, Your Order Cannot Be Completed. Please Ensure That
            The Billing Address You Provided Is The Same One Where Your
            Debit/Credit Card Is Registered. Alternatively, Please Try A
            Different Payment Method.
          </p>

          <Button
            render={<Link href="/checkout/payment" />}
            className="mt-10 h-12 w-full max-w-[280px] rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
          >
            Retry
          </Button>

          <Link
            href="/cart"
            className="mt-6 text-sm text-brand-navy underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-base"
          >
            &lt; Back To My Order
          </Link>
        </div>
      </Container>
    </section>
  )
}
