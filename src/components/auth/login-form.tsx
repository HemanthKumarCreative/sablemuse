"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "cn"

type LoginFormProps = {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const emailId = useId()
  const passwordId = useId()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleTogglePassword = () => {
    setIsPasswordVisible((current) => !current)
  }

  return (
    <div className={cn("flex w-full flex-col justify-center", className)}>
      <h1 className="text-center text-[2rem] font-bold capitalize leading-[1.4] text-ink md:text-[2.5rem]">
        Log In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4"
        noValidate
      >
        <div className="space-y-2">
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
            className="h-12 rounded-none border-ink/40 px-4 text-base text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={passwordId} className="sr-only">
            Password
          </Label>
          <div className="relative">
            <Input
              id={passwordId}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Password"
              aria-label="Password"
              className="h-12 rounded-none border-ink/40 px-4 pr-12 text-base text-ink placeholder:capitalize placeholder:text-ink-muted focus-visible:border-brand focus-visible:ring-brand/30 md:text-base"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              aria-pressed={isPasswordVisible}
              className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {isPasswordVisible ? (
                <EyeOff className="size-5" strokeWidth={1.5} />
              ) : (
                <Eye className="size-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div className="hidden justify-start lg:flex">
          <Link
            href="/forgot-password"
            className="text-sm capitalize text-ink-muted underline-offset-2 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Forgot Your Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-none bg-brand text-base font-medium capitalize text-white hover:bg-brand/90"
        >
          Log In
        </Button>
      </form>

      <div
        className="mt-8 flex items-center justify-center"
        role="separator"
        aria-label="Or continue with"
      >
        <span className="text-sm capitalize text-ink-muted">Or</span>
      </div>

      <AuthSocialButtons className="mt-6" />

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
