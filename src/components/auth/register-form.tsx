"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

type RegisterFormProps = {
  className?: string
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  return (
    <div className={cn("flex w-full flex-col justify-center", className)}>
      <h1 className="heading-page text-center capitalize lg:text-left">
        Create Account
      </h1>
      <p className="mt-4 text-center text-sm text-brand-navy-muted lg:text-left md:text-base">
        Create your account through Shopify. You can register on the next
        screen.
      </p>

      <Button
        render={<Link href="/api/auth/login" />}
        size="xl"
        className="mt-8 w-full"
      >
        Continue With Shopify
      </Button>

      <p className="mt-6 text-center text-sm capitalize leading-copy text-brand-navy md:text-base">
        Already Have An Account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-navy underline underline-offset-2 transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Log In
        </Link>
      </p>

      <p className="mt-8 text-center text-xs leading-relaxed text-brand-navy-muted md:text-sm">
        By continuing you agree to our{" "}
        <Link
          href="/terms"
          className="text-brand-navy underline underline-offset-2 transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-brand-navy underline underline-offset-2 transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
