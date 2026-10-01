import {
  FacebookIcon,
} from "@/components/icons/social-icons"
import { cn } from "cn"

type AuthSocialButtonsProps = {
  className?: string
}

export const GoogleIcon = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  )
}

export const AppleIcon = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.2ZM14.8 6.4c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2Z" />
    </svg>
  )
}

export const AuthSocialButtons = ({ className }: AuthSocialButtonsProps) => {
  const handleAppleClick = () => {}
  const handleGoogleClick = () => {}
  const handleFacebookClick = () => {}

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <button
        type="button"
        onClick={handleAppleClick}
        aria-label="Continue with Apple"
        className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <AppleIcon className="size-6" />
      </button>
      <button
        type="button"
        onClick={handleGoogleClick}
        aria-label="Continue with Google"
        className="inline-flex size-12 items-center justify-center rounded-full border border-brand-border bg-white transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <GoogleIcon className="size-6" />
      </button>
      <button
        type="button"
        onClick={handleFacebookClick}
        aria-label="Continue with Facebook"
        className="inline-flex size-12 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <FacebookIcon className="size-6" />
      </button>
    </div>
  )
}
