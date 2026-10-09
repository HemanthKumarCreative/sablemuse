"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { selectDeliveryOptionAction } from "@/lib/shopify/cart/actions"
import type { DeliveryGroup } from "@/types/commerce"
import { cn } from "cn"

type CheckoutShippingFormProps = {
  className?: string
  deliveryGroups: DeliveryGroup[]
  contactEmail?: string
  shipToSummary?: string
  onShippingCostChange?: (cost: number) => void
}

export const CheckoutShippingForm = ({
  className,
  deliveryGroups,
  contactEmail,
  shipToSummary,
  onShippingCostChange,
}: CheckoutShippingFormProps) => {
  const router = useRouter()
  const methodGroupId = useId()
  const primaryGroup = deliveryGroups[0]
  const [selectedHandle, setSelectedHandle] = useState(
    primaryGroup?.selectedHandle ?? primaryGroup?.options[0]?.handle ?? ""
  )
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectOption = (handle: string, price: number) => {
    setSelectedHandle(handle)
    onShippingCostChange?.(price)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!primaryGroup || !selectedHandle) {
      setError("No delivery options available yet. Check your address and try again.")
      return
    }

    setIsSubmitting(true)
    try {
      await selectDeliveryOptionAction({
        groupId: primaryGroup.groupId,
        deliveryOptionHandle: selectedHandle,
      })
      router.push("/checkout/payment")
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save delivery option"
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
      <h1 className="sr-only">Shipping</h1>

      <div className="border border-brand-border">
        <div className="flex items-start justify-between gap-4 border-b border-brand-border px-4 py-4 md:px-5">
          <div className="min-w-0">
            <p className="text-sm text-brand-navy-muted">Contact</p>
            <p className="mt-1 truncate text-sm text-brand-navy md:text-base">
              {contactEmail || "Saved on previous step"}
            </p>
          </div>
          <Link
            href="/checkout"
            className="shrink-0 text-sm text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Change
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4 px-4 py-4 md:px-5">
          <div className="min-w-0">
            <p className="text-sm text-brand-navy-muted">Ship To</p>
            <p className="mt-1 text-sm text-brand-navy md:text-base">
              {shipToSummary || "Address saved on previous step"}
            </p>
          </div>
          <Link
            href="/checkout"
            className="shrink-0 text-sm text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Change
          </Link>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-brand-navy md:text-2xl">
        Delivery Options
      </h2>

      {primaryGroup?.options.length ? (
        <fieldset className="mt-4 border border-brand-border">
          <legend className="sr-only">Delivery options</legend>
          <ul className="divide-y divide-border" role="list">
            {primaryGroup.options.map((option) => {
              const isSelected = selectedHandle === option.handle
              const optionId = `${methodGroupId}-${option.handle}`

              return (
                <li
                  key={option.handle}
                  className={cn(
                    "px-4 py-4 md:px-5",
                    isSelected ? "bg-muted" : "bg-background"
                  )}
                >
                  <label
                    htmlFor={optionId}
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <input
                      id={optionId}
                      type="radio"
                      name={methodGroupId}
                      checked={isSelected}
                      onChange={() =>
                        handleSelectOption(option.handle, option.price)
                      }
                      className="mt-1 size-4 accent-brand"
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <span>
                        <span className="block text-base font-medium text-brand-navy">
                          {option.title}
                        </span>
                        {option.description ? (
                          <span className="mt-1 block text-sm text-brand-navy-muted">
                            {option.description}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-base font-semibold text-brand-navy">
                        {option.price === 0
                          ? "Free"
                          : `$${option.price.toFixed(2)}`}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      ) : (
        <div className="mt-4 border border-brand-border px-4 py-4 md:px-5">
          <p className="text-sm leading-copy text-brand-navy">
            Shopify did not return delivery rates for this address. Update the
            address and try again.
          </p>
          <Button
            render={<Link href="/checkout" />}
            nativeButton={false}
            variant="outline"
            className="mt-4"
          >
            Edit address
          </Button>
        </div>
      )}

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row-reverse sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={isSubmitting || !primaryGroup?.options.length}
          size="xl"
          className="w-full sm:w-auto sm:min-w-[220px]"
        >
          {isSubmitting ? "Saving..." : "Continue To Payment"}
        </Button>
        <Link
          href="/checkout"
          className="text-center text-sm text-brand-navy-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-left md:text-base"
        >
          &lt; Return To Information
        </Link>
      </div>
    </form>
  )
}
