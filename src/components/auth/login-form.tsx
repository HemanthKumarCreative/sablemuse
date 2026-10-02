"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

type LoginFormProps = {
  className?: string
  error?: string
}

export const LoginForm = ({ className, error }: LoginFormProps) => {
  return (
    <div className={cn("flex w-full flex-col justify-center", className)}>
      <h1 className="heading-page text-center capitalize">
        Log In
      </h1>
      <p className="mt-4 text-center text-sm text-brand-navy-muted md:text-base">
        Sign in securely with your Shopify customer account.
      </p>

      {error ? (
        <p className="mt-4 text-center text-sm text-destructive" role="alert">
          {error === "auth_not_configured"
            ? "Customer Account API is not configured yet."
            : "Unable to sign in. Please try again."}
        </p>
      ) : null}

      <Button
        render={<Link href="/api/auth/login" />}
        size="xl"
        className="mt-8 w-full"
      >
        Continue With Shopify
      </Button>

      <p className="mt-8 text-center text-sm capitalize leading-copy text-brand-navy md:text-base">
        New To Sable Muse?{" "}
        <Link
          href="/register"
          className="font-medium text-brand-navy-muted transition-colors hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Create An Account
        </Link>
      </p>
    </div>
  )
}
