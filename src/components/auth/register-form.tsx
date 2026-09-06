"use client"

import Link from "next/link"
import { useId, useRef, useState } from "react"
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons"
import { VerifyEmailDialog } from "@/components/auth/verify-email-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"

type RegisterFormProps = {
  className?: string
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const firstNameId = useId()
  const lastNameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()

    if (!email) {
      emailInputRef.current?.focus()
      return
    }

    setSubmittedEmail(email)
    setIsVerifyOpen(true)
  }

  const handleChangeEmail = () => {
    window.requestAnimationFrame(() => {
      emailInputRef.current?.focus()
      emailInputRef.current?.select()
    })
  }

  return (
    <div className={cn("flex w-full flex-col justify-center", className)}>
      <h1 className="text-[2rem] font-bold capitalize leading-[1.4] text-ink md:text-[2.5rem]">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4"
        noValidate
      >
        <div className="space-y-2">
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
            className="h-12 rounded-none border-border px-4 text-base capitalize text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
          />
        </div>

        <div className="space-y-2">
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
            className="h-12 rounded-none border-border px-4 text-base capitalize text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={emailId} className="sr-only">
            Email
          </Label>
          <Input
            ref={emailInputRef}
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            aria-label="Email"
            className="h-12 rounded-none border-border px-4 text-base text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={passwordId} className="sr-only">
            Password
          </Label>
          <Input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Password"
            aria-label="Password"
            className="h-12 rounded-none border-border px-4 text-base text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
          />
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
        >
          Register Now
        </Button>
      </form>

      <p className="mt-6 text-center text-sm capitalize leading-[1.8] text-ink md:text-base">
        Already Have An Account?{" "}
        <Link
          href="/login"
          className="font-bold underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Log In
        </Link>
      </p>

      <div
        className="mt-8 flex items-center gap-4"
        role="separator"
        aria-label="Or continue with"
      >
        <span className="h-px flex-1 bg-border" />
        <span className="text-sm capitalize text-ink-muted">Or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <AuthSocialButtons className="mt-6" />

      <p className="mt-8 text-center text-xs leading-relaxed text-ink-muted md:text-sm">
        By clicking Register Now you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <VerifyEmailDialog
        open={isVerifyOpen}
        email={submittedEmail}
        onOpenChange={setIsVerifyOpen}
        onChangeEmail={handleChangeEmail}
      />
    </div>
  )
}
