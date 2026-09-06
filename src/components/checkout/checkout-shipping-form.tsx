"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  DEMO_CHECKOUT_CONTACT,
  DEMO_CHECKOUT_SHIP_TO,
  EXPRESS_DATE_OPTIONS,
  GUARANTEED_OPTIONS,
} from "@/data/checkout"
import { cn } from "cn"

type CheckoutShippingFormProps = {
  className?: string
  onShippingCostChange?: (cost: number) => void
}

export const CheckoutShippingForm = ({
  className,
  onShippingCostChange,
}: CheckoutShippingFormProps) => {
  const router = useRouter()
  const methodGroupId = useId()
  const [deliveryMode, setDeliveryMode] = useState<"express" | "guaranteed">(
    "express"
  )
  const [expressDate, setExpressDate] = useState(EXPRESS_DATE_OPTIONS[0].id)
  const [guaranteedId, setGuaranteedId] = useState(GUARANTEED_OPTIONS[0].id)

  const handleSelectExpress = () => {
    setDeliveryMode("express")
    onShippingCostChange?.(0)
  }

  const handleSelectGuaranteed = (id: string) => {
    setDeliveryMode("guaranteed")
    setGuaranteedId(id)
    const option = GUARANTEED_OPTIONS.find((entry) => entry.id === id)
    onShippingCostChange?.(option?.price ?? 24)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push("/checkout/payment")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col", className)}
      noValidate
    >
      <h1 className="sr-only">Shipping</h1>

      <div className="border border-border">
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 md:px-5">
          <div className="min-w-0">
            <p className="text-sm text-ink-muted">Contact</p>
            <p className="mt-1 truncate text-sm text-ink md:text-base">
              {DEMO_CHECKOUT_CONTACT}
            </p>
          </div>
          <Link
            href="/checkout"
            className="shrink-0 text-sm text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Change
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4 px-4 py-4 md:px-5">
          <div className="min-w-0">
            <p className="text-sm text-ink-muted">Ship To</p>
            <p className="mt-1 text-sm text-ink md:text-base">
              {DEMO_CHECKOUT_SHIP_TO}
            </p>
          </div>
          <Link
            href="/checkout"
            className="shrink-0 text-sm text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Change
          </Link>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-ink md:text-2xl">
        Delivery Options
      </h2>

      <fieldset className="mt-4 border border-border">
        <legend className="sr-only">Delivery options</legend>

        <div
          className={cn(
            "border-b border-border px-4 py-4 md:px-5",
            deliveryMode === "express" ? "bg-[#F0F2EF]" : "bg-white"
          )}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name={methodGroupId}
              checked={deliveryMode === "express"}
              onChange={handleSelectExpress}
              className="mt-1 size-4 accent-brand"
              aria-label="Express Courier (Air), Free"
            />
            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <span>
                <span className="block text-base font-medium text-ink">
                  Express Courier (Air)
                </span>
                <span className="mt-1 block text-sm capitalize text-ink-muted">
                  3 To 4 Business Days
                </span>
              </span>
              <span className="text-base font-semibold text-ink">Free</span>
            </span>
          </label>

          {deliveryMode === "express" ? (
            <div className="mt-4 border-t border-border pt-4 pl-7">
              <p className="mb-3 text-sm font-medium text-ink">Expected Date:</p>
              <ul className="grid grid-cols-2 gap-3" role="list">
                {EXPRESS_DATE_OPTIONS.map((option) => {
                  const optionId = `${methodGroupId}-${option.id}`

                  return (
                    <li key={option.id}>
                      <label
                        htmlFor={optionId}
                        className={cn(
                          "flex h-full cursor-pointer items-start gap-2 border border-border bg-white px-2.5 py-3 text-xs text-ink focus-within:ring-2 focus-within:ring-brand sm:gap-3 sm:px-3 sm:text-sm",
                          expressDate === option.id
                            ? "border-brand"
                            : "hover:border-ink/40"
                        )}
                      >
                        <input
                          id={optionId}
                          type="radio"
                          name={`${methodGroupId}-date`}
                          checked={expressDate === option.id}
                          onChange={() => setExpressDate(option.id)}
                          className="mt-0.5 size-4 shrink-0 accent-brand"
                        />
                        <span>{option.label}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "px-4 py-4 md:px-5",
            deliveryMode === "guaranteed" ? "bg-[#F0F2EF]" : "bg-white"
          )}
        >
          <p className="text-base font-medium text-ink">Guaranteed By</p>
          <p className="mt-1 text-sm text-ink-muted">UPS Next Day Air Saver</p>

          <ul className="mt-4 space-y-3" role="list">
            {GUARANTEED_OPTIONS.map((option) => {
              const isSelected =
                deliveryMode === "guaranteed" && guaranteedId === option.id
              const optionId = `${methodGroupId}-${option.id}`

              return (
                <li key={option.id}>
                  <label
                    htmlFor={optionId}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 border border-border px-3 py-3",
                      isSelected
                        ? "border-brand bg-white"
                        : "bg-white hover:border-ink/40"
                    )}
                  >
                    <input
                      id={optionId}
                      type="radio"
                      name={methodGroupId}
                      checked={isSelected}
                      onChange={() => handleSelectGuaranteed(option.id)}
                      className="mt-1 size-4 accent-brand"
                    />
                    <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <span className="text-sm font-medium text-ink md:text-base">
                        {option.label}
                      </span>
                      <span className="shrink-0 text-base font-semibold text-ink">
                        ${option.price.toFixed(2)}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </fieldset>

      <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row-reverse sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="h-12 w-full rounded-none bg-brand px-8 text-base font-medium capitalize text-white hover:bg-brand/90 sm:w-auto sm:min-w-[220px]"
        >
          Continue To Payment
        </Button>
        <Link
          href="/checkout"
          className="text-center text-sm text-ink-muted underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:text-left md:text-base"
        >
          &lt; Return To Information
        </Link>
      </div>
    </form>
  )
}
