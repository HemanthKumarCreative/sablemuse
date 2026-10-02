"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ChevronRight,
  Headphones,
  Mail,
  MessageCircle,
  Minus,
  Plus,
} from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import { WriteUsDialog } from "@/components/contact/write-us-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

type ContactChannelsProps = {
  className?: string
}

export const ContactChannels = ({ className }: ContactChannelsProps) => {
  const [isWriteUsOpen, setIsWriteUsOpen] = useState(false)

  const handleOpenWriteUs = () => {
    setIsWriteUsOpen(true)
  }

  return (
    <div className={cn("mt-10 md:mt-16", className)}>
      <div className="md:hidden">
        <div className="w-full border border-brand-border">
          <button
            type="button"
            onClick={handleOpenWriteUs}
            aria-haspopup="dialog"
            aria-expanded={isWriteUsOpen}
            className="flex w-full items-center justify-between border-b border-brand-border bg-background px-4 py-4 text-left text-base font-medium text-brand-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex items-center gap-3">
              <Mail className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Write Us
            </span>
            <ChevronRight className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          </button>

          <Accordion defaultValue={["chat"]} className="w-full gap-0">
            <AccordionItem value="chat" className="border-b border-brand-border">
              <AccordionTrigger className="rounded-none bg-muted px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-muted">
                <span className="flex flex-1 items-center gap-3 text-left">
                  <MessageCircle
                    className="size-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Chat With Us
                </span>
                <Plus
                  className="size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:hidden"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Minus
                  className="hidden size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:inline"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </AccordionTrigger>
              <AccordionContent className="bg-muted px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    We Are Here And Ready To Chat
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-background text-base font-medium capitalize text-brand-navy-muted hover:bg-background hover:text-brand-navy"
                    aria-label="Start chat with Sable Muse customer care"
                  >
                    Start Chat
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="call" className="border-b border-brand-border">
              <AccordionTrigger className="rounded-none bg-muted px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-muted">
                <span className="flex flex-1 items-center gap-3 text-left">
                  <Headphones
                    className="size-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Support Hours
                </span>
                <Plus
                  className="size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:hidden"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Minus
                  className="hidden size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:inline"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </AccordionTrigger>
              <AccordionContent className="bg-muted px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    Monday Through Friday, 9 Am To 5 Pm Eastern Time
                  </p>
                  <Button
                    render={<Link href="mailto:hello@sablemuse.shop" />}
                    nativeButton={false}
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-background text-base font-medium text-brand-navy hover:bg-background"
                  >
                    hello@sablemuse.shop
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="email" className="border-0">
              <AccordionTrigger className="rounded-none bg-muted px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-ring **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-muted">
                <span className="flex flex-1 items-center gap-3 text-left">
                  <Mail className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  Email Us
                </span>
                <Plus
                  className="size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:hidden"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Minus
                  className="hidden size-4 shrink-0 text-brand-navy group-aria-expanded/accordion-trigger:inline"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </AccordionTrigger>
              <AccordionContent className="bg-muted px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    We Are Here And Ready To Help
                  </p>
                  <Button
                    render={<Link href="mailto:hello@sablemuse.shop" />}
                    nativeButton={false}
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-background text-base font-medium capitalize text-brand-navy hover:bg-background"
                  >
                    Send Email
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <WriteUsDialog open={isWriteUsOpen} onOpenChange={setIsWriteUsOpen} />
      </div>

      <div className="hidden md:block">
        <div id="write-us" className="mx-auto max-w-3xl">
          <ContactForm />
        </div>

        <ul
          className="mt-20 grid gap-6 md:grid-cols-3"
          role="list"
          aria-label="Contact channels"
        >
          <li>
            <article className="flex h-full flex-col items-center bg-muted px-6 py-8 text-center">
              <MessageCircle
                className="size-7 text-brand-navy"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-brand-navy">Chat With Us</h2>
              <p className="mt-2 text-sm text-brand-navy-muted">
                We are here and ready to chat
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6 h-11 w-full rounded-none border-brand-border text-base font-medium capitalize text-brand-navy hover:bg-brand hover:text-ink"
                aria-label="Start chat with Sable Muse customer care"
              >
                Start Chat
              </Button>
            </article>
          </li>
          <li>
            <article className="flex h-full flex-col items-center bg-muted px-6 py-8 text-center">
              <Headphones
                className="size-7 text-brand-navy"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-brand-navy">Support Hours</h2>
              <p className="mt-2 text-sm text-brand-navy-muted">
                Monday through Friday, 9 am to 5 pm Eastern Time
              </p>
              <Button
                render={<Link href="mailto:hello@sablemuse.shop" />}
                nativeButton={false}
                variant="outline"
                className="mt-6 h-11 w-full rounded-none border-brand-border text-base font-medium text-brand-navy hover:bg-brand hover:text-ink"
              >
                hello@sablemuse.shop
              </Button>
            </article>
          </li>
          <li>
            <article className="flex h-full flex-col items-center bg-muted px-6 py-8 text-center">
              <Mail
                className="size-7 text-brand-navy"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-brand-navy">Email Us</h2>
              <p className="mt-2 text-sm text-brand-navy-muted">
                We are here and ready to help
              </p>
              <Button
                render={<Link href="mailto:hello@sablemuse.shop" />}
                nativeButton={false}
                variant="outline"
                className="mt-6 h-11 w-full rounded-none border-brand-border text-base font-medium capitalize text-brand-navy hover:bg-brand hover:text-ink"
              >
                Send Email
              </Button>
            </article>
          </li>
        </ul>
      </div>
    </div>
  )
}
