"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"
import {
  Building2,
  ChevronDown,
  CircleHelp,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
] as const

const PAYMENT_BRANDS = ["Amex", "Visa", "Mastercard", "PayPal"] as const

const fieldClassName =
  "h-12 rounded-none border-border bg-white px-4 text-base text-ink placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"

type CheckoutPaymentFormProps = {
  className?: string
}

export const CheckoutPaymentForm = ({
  className,
}: CheckoutPaymentFormProps) => {
  const router = useRouter()
  const billingModeId = useId()
  const nameId = useId()
  const emailId = useId()
  const countryId = useId()
  const address1Id = useId()
  const address2Id = useId()
  const cityId = useId()
  const postalId = useId()
  const phoneId = useId()
  const cardNumberId = useId()
  const monthId = useId()
  const yearId = useId()
  const cvvId = useId()

  const [billingMode, setBillingMode] = useState<"same" | "alternative">("same")
  const [showCvvHelp, setShowCvvHelp] = useState(false)

  const handleToggleCvvHelp = () => {
    setShowCvvHelp((current) => !current)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push("/checkout/success")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12", className)}
      noValidate
    >
      <div>
        <h2 className="text-xl font-semibold text-ink md:text-2xl">
          Billing Address
        </h2>

        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Billing address options</legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink md:text-base">
            <input
              type="radio"
              name={billingModeId}
              checked={billingMode === "same"}
              onChange={() => setBillingMode("same")}
              className="size-4 accent-brand"
            />
            Default (Same As Shipping Address)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink md:text-base">
            <input
              type="radio"
              name={billingModeId}
              checked={billingMode === "alternative"}
              onChange={() => setBillingMode("alternative")}
              className="size-4 accent-brand"
            />
            Add An Alternative Billing Address
          </label>
        </fieldset>

        {billingMode === "alternative" ? (
          <div className="mt-6 space-y-4">
            <div className="relative">
              <Label htmlFor={nameId} className="sr-only">
                Name
              </Label>
              <User
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <Input
                id={nameId}
                name="billingName"
                type="text"
                autoComplete="name"
                required
                placeholder="Name"
                aria-label="Name"
                className={cn(fieldClassName, "pl-11")}
              />
            </div>

            <div className="relative">
              <Label htmlFor={emailId} className="sr-only">
                Email
              </Label>
              <Mail
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <Input
                id={emailId}
                name="billingEmail"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                aria-label="Email"
                className={cn(fieldClassName, "pl-11")}
              />
            </div>

            <div className="relative">
              <Label htmlFor={countryId} className="sr-only">
                Country
              </Label>
              <Building2
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <select
                id={countryId}
                name="billingCountry"
                required
                defaultValue="United States"
                aria-label="Country"
                className={cn(
                  fieldClassName,
                  "w-full appearance-none pr-10 pl-11"
                )}
              >
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink"
                aria-hidden="true"
              />
            </div>

            <div className="relative">
              <Label htmlFor={address1Id} className="sr-only">
                Address Line 1
              </Label>
              <MapPin
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <Input
                id={address1Id}
                name="billingAddress1"
                type="text"
                autoComplete="address-line1"
                required
                placeholder="Address Line 1"
                aria-label="Address Line 1"
                className={cn(fieldClassName, "pl-11")}
              />
            </div>

            <div>
              <Label htmlFor={address2Id} className="sr-only">
                Address Line 2
              </Label>
              <Input
                id={address2Id}
                name="billingAddress2"
                type="text"
                autoComplete="address-line2"
                placeholder="Address Line 2"
                aria-label="Address Line 2"
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={cityId} className="sr-only">
                  City / Suburb
                </Label>
                <Input
                  id={cityId}
                  name="billingCity"
                  type="text"
                  autoComplete="address-level2"
                  required
                  placeholder="City / Suburb"
                  aria-label="City / Suburb"
                  className={fieldClassName}
                />
              </div>
              <div>
                <Label htmlFor={postalId} className="sr-only">
                  Zip / Postcode
                </Label>
                <Input
                  id={postalId}
                  name="billingPostal"
                  type="text"
                  autoComplete="postal-code"
                  required
                  placeholder="Zip / Postcode"
                  aria-label="Zip / Postcode"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="relative">
              <Label htmlFor={phoneId} className="sr-only">
                Phone
              </Label>
              <Phone
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <Input
                id={phoneId}
                name="billingPhone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Phone"
                aria-label="Phone"
                className={cn(fieldClassName, "pl-11")}
              />
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink-muted">
            We&apos;ll use the shipping address from the previous step for
            billing.
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-ink md:text-2xl">Payment</h2>
        <p className="mt-2 text-sm text-ink-muted md:text-base">
          Please Choose Your Payment Method
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Accepted payment methods"
        >
          {PAYMENT_BRANDS.map((brand) => (
            <li
              key={brand}
              className="inline-flex h-9 items-center border border-border bg-white px-3 text-xs font-semibold tracking-wide text-ink uppercase"
            >
              {brand}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-4">
          <div>
            <Label
              htmlFor={cardNumberId}
              className="mb-2 block text-sm font-medium text-ink"
            >
              Card Number*
            </Label>
            <Input
              id={cardNumberId}
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              placeholder="Card Number"
              aria-label="Card Number"
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label
                htmlFor={monthId}
                className="mb-2 block text-sm font-medium text-ink"
              >
                Expiry Month*
              </Label>
              <Input
                id={monthId}
                name="expiryMonth"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp-month"
                required
                placeholder="MM"
                aria-label="Expiry Month"
                className={fieldClassName}
              />
            </div>
            <div>
              <Label
                htmlFor={yearId}
                className="mb-2 block text-sm font-medium text-ink"
              >
                Expiry Year*
              </Label>
              <Input
                id={yearId}
                name="expiryYear"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp-year"
                required
                placeholder="YY"
                aria-label="Expiry Year"
                className={fieldClassName}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <Label
                htmlFor={cvvId}
                className="text-sm font-medium text-ink"
              >
                Security Code*
              </Label>
              <button
                type="button"
                onClick={handleToggleCvvHelp}
                className="inline-flex items-center gap-1 text-sm text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-expanded={showCvvHelp}
              >
                What is this?
                <CircleHelp className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <Input
              id={cvvId}
              name="securityCode"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
              placeholder="CVV"
              aria-label="Security Code"
              className={cn(fieldClassName, "max-w-[160px]")}
            />
            {showCvvHelp ? (
              <p className="mt-2 text-sm text-ink-muted">
                The 3 or 4 digit code on the back of your card (front for Amex).
              </p>
            ) : null}
          </div>
        </div>

        <Button
          type="submit"
          className="mt-8 h-12 w-full rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
        >
          Pay And Place Order
        </Button>

        <p className="mt-4 text-xs leading-[1.7] text-ink-muted">
          By clicking Pay And Place Order, you agree to Modimal&apos;s{" "}
          <Link
            href="/sustainability"
            className="underline underline-offset-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Terms of Sale
          </Link>{" "}
          and{" "}
          <Link
            href="/sustainability"
            className="underline underline-offset-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-8">
          <Link
            href="/checkout/shipping"
            className="text-sm text-ink-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-base"
          >
            &lt; Return To Shipping
          </Link>
        </div>
      </div>
    </form>
  )
}
