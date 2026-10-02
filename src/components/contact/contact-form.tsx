"use client"

import Link from "next/link"
import { useId, useState, type FormEvent } from "react"
import { ChevronDown, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"

const fieldClassName =
  "h-12 rounded-none border-0 border-b border-brand-border bg-transparent px-0 text-base text-brand-navy placeholder:text-brand-navy-muted focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ring"

const SUBJECT_OPTIONS = [
  "Order Inquiry",
  "Product Question",
  "Sizing",
  "Returns & Exchanges",
  "Other",
] as const

type ContactFormProps = {
  className?: string
  hideHeading?: boolean
  variant?: "page" | "modal"
  onSubmitted?: () => void
}

export const ContactForm = ({
  className,
  hideHeading = false,
  variant = "page",
  onSubmitted,
}: ContactFormProps) => {
  const fullNameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const orderId = useId()
  const messageId = useId()
  const policyId = useId()
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const [mailNote, setMailNote] = useState("")
  const isModal = variant === "modal"

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!acceptedPolicy) {
      return
    }

    const data = new FormData(event.currentTarget)
    const fullName = String(data.get("fullName") ?? "")
    const email = String(data.get("email") ?? "")
    const subject = String(data.get("subject") ?? "Sable Muse")
    const orderNumber = String(data.get("orderNumber") ?? "")
    const message = String(data.get("message") ?? "")
    const body = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      orderNumber ? `Order: ${orderNumber}` : "",
      "",
      message,
    ]
      .filter((line) => line !== "")
      .join("\n")

    window.location.href = `mailto:hello@sablemuse.shop?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setMailNote(
      "Your email app should open with this message. If it does not, write to hello@sablemuse.shop."
    )
    onSubmitted?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      {hideHeading || isModal ? null : (
        <div className="flex items-center gap-3">
          <PenLine className="size-5 text-brand-navy" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-brand-navy md:text-2xl">Write Us</h2>
        </div>
      )}

      {isModal ? null : (
        <p
          className={cn(
            "text-base font-medium text-brand-navy",
            hideHeading ? "mt-0" : "mt-6"
          )}
        >
          Your Information
        </p>
      )}

      <div className={cn("space-y-5", isModal ? "mt-0" : "mt-4")}>
        <div>
          <Label htmlFor={fullNameId} className="sr-only">
            Full Name
          </Label>
          <Input
            id={fullNameId}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Full Name"
            aria-label="Full Name"
            className={fieldClassName}
          />
        </div>
        <div>
          <Label htmlFor={emailId} className="sr-only">
            Email
          </Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            aria-label="Email"
            className={fieldClassName}
          />
        </div>
        <div className="relative">
          <Label htmlFor={subjectId} className="sr-only">
            Subject
          </Label>
          {isModal ? (
            <>
              <select
                id={subjectId}
                name="subject"
                required
                defaultValue=""
                aria-label="Subject"
                className={cn(
                  fieldClassName,
                  "w-full appearance-none pr-8 text-brand-navy-muted valid:text-brand-navy"
                )}
              >
                <option value="" disabled>
                  Subject
                </option>
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-brand-navy-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </>
          ) : (
            <Input
              id={subjectId}
              name="subject"
              type="text"
              required
              placeholder="Subject"
              aria-label="Subject"
              className={fieldClassName}
            />
          )}
        </div>
        <div>
          <Label htmlFor={orderId} className="sr-only">
            Order Number
          </Label>
          <Input
            id={orderId}
            name="orderNumber"
            type="text"
            placeholder="Order Number"
            aria-label="Order Number"
            className={fieldClassName}
          />
        </div>
        <div>
          <Label htmlFor={messageId} className="sr-only">
            Message
          </Label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={isModal ? 3 : 4}
            placeholder="Message"
            aria-label="Message"
            className="w-full resize-y rounded-none border-0 border-b border-brand-border bg-transparent px-0 py-3 text-base text-brand-navy placeholder:text-brand-navy-muted outline-none focus-visible:border-brand"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <Checkbox
          id={policyId}
          checked={acceptedPolicy}
          onCheckedChange={(checked) => setAcceptedPolicy(checked === true)}
          required
          className="mt-0.5 size-4 rounded-none border-brand-border data-checked:border-ink data-checked:bg-ink data-checked:text-background"
        />
        <Label
          htmlFor={policyId}
          className={cn(
            "text-sm font-normal leading-relaxed text-brand-navy",
            isModal && "capitalize"
          )}
        >
          {isModal ? (
            <>
              I Have Read And Understood The{" "}
              <Link
                href="/privacy"
                className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Privacy Policy
              </Link>
              .
            </>
          ) : (
            <>
              I have read and understood the{" "}
              <Link
                href="/privacy"
                className="text-brand-navy underline-offset-2 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                privacy policy
              </Link>
              .
            </>
          )}
        </Label>
      </div>

      {mailNote ? (
        <p className="mt-4 text-sm text-brand-navy" role="status">
          {mailNote}
        </p>
      ) : null}

      <div className={cn("mt-8", isModal ? "flex" : "flex justify-end")}>
        <Button
          type="submit"
          size="xl"
          className={cn(isModal ? "w-full" : "px-16")}
        >
          Send
        </Button>
      </div>
    </form>
  )
}
