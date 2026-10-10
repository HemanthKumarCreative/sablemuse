"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, LoaderCircle } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/data/navigation"
import { subscribeEmailAction } from "@/lib/shopify/admin/actions"

const TRUST_LINKS = [
  {
    href: "/shipping",
    label: "Free US shipping",
    external: false,
  },
  {
    href: "/returns",
    label: "Returns within 7 days",
    external: false,
  },
  {
    href: "mailto:support@sablemuse.shop",
    label: "support@sablemuse.shop",
    external: true,
  },
] as const

const linkClassName =
  "text-sm text-background/75 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"

const trustLinkClassName =
  "underline-offset-4 transition-colors hover:text-background hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"

export const SiteFooter = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()

    if (!email) {
      setMessage({ type: "error", text: "Enter a valid email address." })
      return
    }

    setPending(true)
    setMessage(null)

    try {
      const result = await subscribeEmailAction(email)
      if (!result.ok) {
        setMessage({ type: "error", text: result.error })
        return
      }

      setMessage({
        type: "success",
        text: result.alreadySubscribed
          ? "You are already subscribed."
          : "Thanks — you are on the list.",
      })
      form.reset()
    } catch (error) {
      const detail =
        error instanceof Error && error.message
          ? error.message
          : "We could not save that email. Please try again."
      setMessage({ type: "error", text: detail })
    } finally {
      setPending(false)
    }
  }

  return (
    <footer className="bg-footer text-background">
      <Container className="py-10 md:py-14">
        <ul
          className="grid gap-3 border-b border-background/15 pb-8 text-sm text-background/75 sm:grid-cols-3 md:pb-10"
          aria-label="Shopping details"
        >
          {TRUST_LINKS.map((item, index) => {
            const alignment =
              index === 1
                ? "sm:text-center"
                : index === 2
                  ? "sm:text-right"
                  : undefined

            return (
              <li key={item.label} className={alignment}>
                {item.external ? (
                  <a href={item.href} className={trustLinkClassName}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={trustLinkClassName}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="grid gap-10 pt-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-start md:gap-x-16 md:gap-y-10 md:pt-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-20">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-[0.01em] text-background sm:text-[1.75rem]">
              Get new arrivals and shipping updates
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-background/65">
              Join the list for drops and shipping notes. Unsubscribe anytime.
            </p>
            <form
              onSubmit={(event) => void handleSubmit(event)}
              className="mt-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Your email address"
                  size="xl"
                  disabled={pending}
                  aria-invalid={message?.type === "error" || undefined}
                  aria-describedby="newsletter-status"
                  className="border-background/40 bg-transparent text-background placeholder:text-background/45 focus-visible:border-background focus-visible:ring-background/30 sm:min-w-0 sm:flex-1"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="xl"
                  disabled={pending}
                  aria-busy={pending}
                  className="h-12 shrink-0 px-6 sm:min-w-[8.5rem]"
                >
                  {pending ? (
                    <>
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Joining
                    </>
                  ) : (
                    <>
                      Join
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </>
                  )}
                </Button>
              </div>
              <div
                id="newsletter-status"
                className="mt-3 min-h-5"
                aria-live="polite"
              >
                {message ? (
                  <p
                    className={
                      message.type === "success"
                        ? "text-sm font-medium text-background"
                        : "text-sm font-medium text-amber-200"
                    }
                    role={message.type === "error" ? "alert" : "status"}
                  >
                    {message.text}
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-background/50">
                    We only use this for Sable Muse updates.
                  </p>
                )}
              </div>
            </form>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-sm font-semibold tracking-eyebrow text-background uppercase">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClassName}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-background/15 pt-6 text-sm text-background/55 sm:flex-row sm:items-center sm:justify-between md:mt-12">
          <p>© {new Date().getFullYear()} Sable Muse. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
