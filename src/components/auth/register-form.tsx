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
      <h1 className="text-center text-[2rem] font-semibold capitalize leading-[1.4] text-brand-navy lg:text-left md:text-[2.5rem]">
        Create Account
      </h1>
      <p className="mt-4 text-center text-sm text-brand-navy-muted lg:text-left md:text-base">
        Create your account through Shopify. You can register on the next
        screen.
      </p>

      <Button
        render={<Link href="/api/auth/login" />}
        className="mt-8 h-12 w-full rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
      >
        Continue With Shopify
      </Button>

      <p className="mt-6 text-center text-sm capitalize leading-[1.8] text-brand-navy md:text-base">
        Already Have An Account?{" "}
        <Link
          href="/login"
          className="font-semibold underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Log In
        </Link>
      </p>

      <p className="mt-8 text-center text-xs leading-relaxed text-brand-navy-muted md:text-sm">
        By continuing you agree to our{" "}
        <Link
          href="/faq"
          className="underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Terms & Conditions
        </Link>{" "}
        and Privacy Policy.
      </p>
    </div>
  )
}
