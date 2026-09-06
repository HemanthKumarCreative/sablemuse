"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"
import { ChevronDown, CircleHelp, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

const fieldClassName =
  "h-12 rounded-none border-border bg-white px-4 text-base text-ink placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"

type CheckoutInfoFormProps = {
  className?: string
}

export const CheckoutInfoForm = ({ className }: CheckoutInfoFormProps) => {
  const router = useRouter()
  const emailId = useId()
  const newsId = useId()
  const countryId = useId()
  const firstNameId = useId()
  const lastNameId = useId()
  const companyId = useId()
  const addressId = useId()
  const apartmentId = useId()
  const postalId = useId()
  const cityId = useId()
  const phoneId = useId()
  const saveId = useId()

  const [emailNews, setEmailNews] = useState(false)
  const [saveInfo, setSaveInfo] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push("/checkout/shipping")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col", className)}
      noValidate
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold text-ink md:text-2xl">Contact</h2>
        <p className="text-sm text-ink-muted">
          Have An Account?{" "}
          <Link
            href="/login"
            className="text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Log In
          </Link>
        </p>
      </div>

      <div className="relative mt-4">
        <Label htmlFor={emailId} className="sr-only">
          Email
        </Label>
        <Mail
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          aria-label="Email"
          className={cn(fieldClassName, "pl-11")}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id={newsId}
          checked={emailNews}
          onCheckedChange={(checked) => setEmailNews(checked === true)}
          className="size-4 rounded-none border-border data-checked:border-brand data-checked:bg-brand"
        />
        <Label htmlFor={newsId} className="text-sm font-normal text-ink">
          Email Me With News And Offers
        </Label>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-ink md:text-2xl">
        Shipping Address
      </h2>

      <div className="relative mt-4">
        <Label htmlFor={countryId} className="sr-only">
          Country / Region
        </Label>
        <select
          id={countryId}
          name="country"
          required
          defaultValue="United States"
          aria-label="Country / Region"
          className={cn(fieldClassName, "w-full appearance-none pr-10")}
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={firstNameId} className="sr-only">
            First Name
          </Label>
          <Input
            id={firstNameId}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            placeholder="First Name"
            aria-label="First Name"
            className={fieldClassName}
          />
        </div>
        <div>
          <Label htmlFor={lastNameId} className="sr-only">
            Last Name
          </Label>
          <Input
            id={lastNameId}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Last Name"
            aria-label="Last Name"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor={companyId} className="sr-only">
          Company
        </Label>
        <Input
          id={companyId}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company (Optional)"
          aria-label="Company (Optional)"
          className={fieldClassName}
        />
      </div>

      <div className="relative mt-4">
        <Label htmlFor={addressId} className="sr-only">
          Address
        </Label>
        <MapPin
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
        <Input
          id={addressId}
          name="address"
          type="text"
          autoComplete="street-address"
          required
          placeholder="Address"
          aria-label="Address"
          className={cn(fieldClassName, "pl-11")}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor={apartmentId} className="sr-only">
          Apartment, Suite, Etc.
        </Label>
        <Input
          id={apartmentId}
          name="apartment"
          type="text"
          autoComplete="address-line2"
          placeholder="Apartment, Suite, Etc. (Optional)"
          aria-label="Apartment, Suite, Etc. (Optional)"
          className={fieldClassName}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={postalId} className="sr-only">
            Postal Code
          </Label>
          <Input
            id={postalId}
            name="postalCode"
            type="text"
            autoComplete="postal-code"
            required
            placeholder="Postal Code"
            aria-label="Postal Code"
            className={fieldClassName}
          />
        </div>
        <div>
          <Label htmlFor={cityId} className="sr-only">
            City
          </Label>
          <Input
            id={cityId}
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="City"
            aria-label="City"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="relative mt-4">
        <Label htmlFor={phoneId} className="sr-only">
          Phone
        </Label>
        <Input
          id={phoneId}
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="Phone"
          aria-label="Phone"
          className={cn(fieldClassName, "pr-11")}
        />
        <CircleHelp
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id={saveId}
          checked={saveInfo}
          onCheckedChange={(checked) => setSaveInfo(checked === true)}
          className="size-4 rounded-none border-border data-checked:border-brand data-checked:bg-brand"
        />
        <Label htmlFor={saveId} className="text-sm font-normal text-ink">
          Save This Information For Next Time
        </Label>
      </div>

      <div className="mt-10 flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href="/cart"
          className="text-sm text-ink-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-base"
        >
          &lt; Return To Cart
        </Link>
        <Button
          type="submit"
          className="h-12 rounded-none bg-brand px-8 text-base font-medium capitalize text-white hover:bg-brand/90 sm:min-w-[220px]"
        >
          Continue To Shipping
        </Button>
      </div>
    </form>
  )
}
