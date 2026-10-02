"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"
import { ChevronDown, Phone, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateCheckoutInfoAction } from "@/lib/shopify/cart/actions"
import { cn } from "cn"

const COUNTRY_CODES: Array<{ label: string; code: string }> = [
  { label: "United States", code: "US" },
]

const fieldClassName =
  "h-12 rounded-none border-brand-border bg-background px-4 text-base text-brand-navy placeholder:text-brand-navy-muted"

type CheckoutInfoFormProps = {
  className?: string
  customerAccessToken?: string
}

export const CheckoutInfoForm = ({
  className,
  customerAccessToken,
}: CheckoutInfoFormProps) => {
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
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    const form = new FormData(event.currentTarget)

    try {
      await updateCheckoutInfoAction({
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        countryCode: String(form.get("country") ?? "US"),
        firstName: String(form.get("firstName") ?? ""),
        lastName: String(form.get("lastName") ?? ""),
        company: String(form.get("company") ?? "") || undefined,
        address1: String(form.get("address") ?? ""),
        address2: String(form.get("apartment") ?? "") || undefined,
        city: String(form.get("city") ?? ""),
        zip: String(form.get("postalCode") ?? ""),
        customerAccessToken,
      })
      router.push("/checkout/shipping")
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save checkout info"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className={cn("flex w-full flex-col", className)}
      noValidate
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold text-brand-navy md:text-2xl">Contact</h2>
        <p className="text-sm text-brand-navy-muted">
          Have An Account?{" "}
          <Link
            href="/login"
            className="text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Log In
          </Link>
        </p>
      </div>

      <div className="relative mt-4">
        <Label htmlFor={emailId} className="sr-only">
          Email
        </Label>
        <User
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-brand-navy-muted"
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
          className="size-4 rounded-none border-brand-border data-checked:border-ink data-checked:bg-ink data-checked:text-background"
        />
        <Label htmlFor={newsId} className="text-sm font-normal text-brand-navy">
          Email Me With News And Offers
        </Label>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-brand-navy md:text-2xl">
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
          defaultValue="US"
          aria-label="Country / Region"
          className={cn(fieldClassName, "w-full appearance-none pr-10")}
        >
          {COUNTRY_CODES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand-navy"
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
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-brand-navy-muted"
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
        <Phone
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand-navy-muted"
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id={saveId}
          checked={saveInfo}
          onCheckedChange={(checked) => setSaveInfo(checked === true)}
          className="size-4 rounded-none border-brand-border data-checked:border-ink data-checked:bg-ink data-checked:text-background"
        />
        <Label htmlFor={saveId} className="text-sm font-normal text-brand-navy">
          Save This Information For Next Time
        </Label>
      </div>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row-reverse sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="xl"
          className="w-full sm:w-auto sm:min-w-[220px]"
        >
          {isSubmitting ? "Saving..." : "Continue To Shipping"}
        </Button>
        <Link
          href="/cart"
          className="text-center text-sm text-brand-navy-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-left md:text-base"
        >
          &lt; Return To Cart
        </Link>
      </div>
    </form>
  )
}
