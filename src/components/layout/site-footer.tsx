"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TwitterIcon } from
"@/components/icons/social-icons";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FOOTER_LINKS } from "@/data/navigation";

export const SiteFooter = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!email) {
      return;
    }
    const href = `mailto:hello@sablemuse.shop?subject=${encodeURIComponent("Sable Muse updates")}&body=${encodeURIComponent(`Please send Sable Muse updates to ${email}.`)}`;
    window.location.href = href;
  };

  return (
    <footer className="bg-footer text-background">
      <Container className="py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col justify-between gap-8 md:col-span-6 md:gap-10">
            <div className="space-y-5">
              <h2 className="max-w-md text-lg font-semibold sm:text-xl md:text-2xl">
                Get new arrivals and US shipping updates
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
                    size="xl"
                    className="border-background bg-transparent pr-12 text-background placeholder:text-background/60 focus-visible:border-background focus-visible:ring-background/30" />
                  
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    aria-label="Email hello@sablemuse.shop"
                    className="absolute top-1/2 right-1 size-10 -translate-y-1/2 rounded-none text-background hover:bg-background/10 hover:text-background">
                    
                    <ArrowRight className="size-5" strokeWidth={1.5} />
                  </Button>
                </div>
                <label className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-background/90">
                  <Checkbox
                    className="mt-0.5 rounded-none border-background data-checked:border-background data-checked:bg-background data-checked:text-footer"
                    aria-label="Open an email to hello@sablemuse.shop" />
                  
                  <span>
                    Submitting opens your email app with a note to
                    hello@sablemuse.shop. This site does not store the address.
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
                    rel="noopener noreferrer">
                    
                    <InstagramIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    aria-label="Facebook"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer">
                    
                    <FacebookIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://pinterest.com"
                    aria-label="Pinterest"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer">
                    
                    <PinterestIcon className="size-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="inline-flex transition-opacity hover:opacity-80"
                    target="_blank"
                    rel="noopener noreferrer">
                    
                    <TwitterIcon className="size-7" />
                  </Link>
                </li>
              </ul>
              <p className="text-sm text-background/90">
                © {new Date().getFullYear()} Sable Muse. All Rights Reserved.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              About Sable Muse
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.about.map((link) =>
              <li key={link.label}>
                  <Link
                  href={link.href}
                  className="text-sm text-background/90 transition-colors hover:text-background">
                  
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              Help & Support
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.help.map((link) =>
              <li key={link.label}>
                  <Link
                  href={link.href}
                  className="text-sm text-background/90 transition-colors hover:text-background">
                  
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-base font-semibold md:text-lg">
              The Shop
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.club.map((link) =>
              <li key={link.label}>
                  <Link
                  href={link.href}
                  className="text-sm text-background/90 transition-colors hover:text-background">
                  
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-6 border-t border-background/20 pt-8 md:hidden">
            <ul className="flex items-center gap-4" aria-label="Social media">
              <li>
                <Link
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <InstagramIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <FacebookIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://pinterest.com"
                  aria-label="Pinterest"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <PinterestIcon className="size-7" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="inline-flex transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <TwitterIcon className="size-7" />
                </Link>
              </li>
            </ul>
            <p className="text-sm text-background/90">
              © {new Date().getFullYear()} Sable Muse. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )

};