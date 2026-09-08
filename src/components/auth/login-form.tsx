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
      <h1 className="text-center text-[2rem] font-bold capitalize leading-[1.4] text-ink md:text-[2.5rem]">
        Log In
      </h1>
      <p className="mt-4 text-center text-sm text-ink-muted md:text-base">
        Sign in securely with your Shopify customer account.
      </p>

      {error ? (
        <p className="mt-4 text-center text-sm text-red-600" role="alert">
          {error === "auth_not_configured"
            ? "Customer Account API is not configured yet."
            : "Unable to sign in. Please try again."}
        </p>
      ) : null}

      <Button
        render={<Link href="/api/auth/login" />}
        className="mt-8 h-12 w-full rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
      >
        Continue With Shopify
      </Button>

      <p className="mt-8 text-center text-sm capitalize leading-[1.8] text-ink md:text-base">
        New To Modimal?{" "}
        <Link
          href="/register"
          className="font-medium text-ink-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Create An Account
        </Link>
      </p>
    </div>
  )
}
