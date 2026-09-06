"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon,
} from "@/components/icons/social-icons"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { FOOTER_LINKS } from "@/data/navigation"

export const SiteFooter = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <footer className="bg-footer text-white">
      <Container className="py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col justify-between gap-8 md:col-span-6 md:gap-10">
            <div className="space-y-5">
              <h2 className="max-w-md text-lg font-semibold sm:text-xl md:text-2xl">
                Join our club, get 15% off for your Birthday
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="h-12 rounded-none border-white bg-transparent pr-12 text-white placeholder:text-white/60 focus-visible:border-white focus-visible:ring-white/30"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    aria-label="Subscribe to newsletter"
                    className="absolute top-1/2 right-1 size-10 -translate-y-1/2 rounded-none text-white hover:bg-white/10 hover:text-white"
                  >
                    <ArrowRight className="size-5" strokeWidth={1.5} />
                  </Button>
                </div>
                <label className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-white/90">
                  <Checkbox
                    className="mt-0.5 rounded-none border-white data-checked:border-white data-checked:bg-white data-checked:text-footer"
                    aria-label="Agree to receive advertising emails"
                  />
                  <span>
                    By Submitting your email, you agree to receive advertising
                    emails from Modimal.
                  </span>
                </label>
              </form>
            </div>

            <div className="hidden space-y-6 md:block">
              <ul className="flex items-center gap-4" aria-label="Social media">
                <li>
                  <Link
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    aria-label="Facebook"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://pinterest.com"
                    aria-label="Pinterest"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PinterestIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="size-7" />
                  </Link>
                </li>
              </ul>
              <p className="text-sm text-white/90">
                © 2023 modimal. All Rights Reserved.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              About Modimal
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              Help & Support
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              Modimal Club
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.club.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 border-t border-white/20 pt-8 md:hidden">
            <ul className="flex items-center gap-4" aria-label="Social media">
              <li>
                <Link
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://pinterest.com"
                  aria-label="Pinterest"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PinterestIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className="size-7" />
                </Link>
              </li>
            </ul>
            <p className="text-sm text-white/90">
              © 2023 modimal. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
