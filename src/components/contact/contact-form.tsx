"use client"

import Link from "next/link"
import { useId, useState, type FormEvent } from "react"
import { PenLine } from "lucide-react"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"

const fieldClassName =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-ink placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-0 md:text-base"

type ContactFormProps = {
  className?: string
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const fullNameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const orderId = useId()
  const messageId = useId()
  const policyId = useId()
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!acceptedPolicy) {
      return
    }

    setIsSubmitted(true)
    event.currentTarget.reset()
    setAcceptedPolicy(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div className="flex items-center gap-3">
        <PenLine className="size-5 text-ink" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-ink md:text-2xl">Write Us</h2>
      </div>

      <p className="mt-6 text-base font-medium text-ink">Your Information</p>

      <div className="mt-4 space-y-5">
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
        <div>
          <Label htmlFor={subjectId} className="sr-only">
            Subject
          </Label>
          <Input
            id={subjectId}
            name="subject"
            type="text"
            required
            placeholder="Subject"
            aria-label="Subject"
            className={fieldClassName}
          />
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
            rows={4}
            placeholder="Message"
            aria-label="Message"
            className="w-full resize-y rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-muted outline-none focus-visible:border-brand"
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <Checkbox
          id={policyId}
          checked={acceptedPolicy}
          onCheckedChange={(checked) => setAcceptedPolicy(checked === true)}
          required
          className="mt-0.5 size-4 rounded-none border-border data-checked:border-brand data-checked:bg-brand"
        />
        <Label htmlFor={policyId} className="text-sm font-normal leading-relaxed text-ink">
          I have read and understood the{" "}
          <Link
            href="/privacy-policy"
            className="text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            contact us privacy and policy
          </Link>
          .
        </Label>
      </div>

      {isSubmitted ? (
        <p className="mt-4 text-sm text-brand" role="status">
          Thanks — your message is on its way. We&apos;ll reply within 1–2
          business days.
        </p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          className="h-12 rounded-none bg-brand px-16 text-base font-medium capitalize text-white hover:bg-brand/90"
        >
          Send
        </Button>
      </div>
    </form>
  )
}
