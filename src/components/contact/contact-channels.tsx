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
            className="flex w-full items-center justify-between border-b border-brand-border bg-white px-4 py-4 text-left text-base font-medium text-brand-navy transition-colors hover:bg-[#f8f9f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span className="flex items-center gap-3">
              <Mail className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Write Us
            </span>
            <ChevronRight className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          </button>

          <Accordion defaultValue={["chat"]} className="w-full gap-0">
            <AccordionItem value="chat" className="border-b border-brand-border">
              <AccordionTrigger className="rounded-none bg-[#e8ede5] px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-brand **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-[#f0f2ef]">
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
              <AccordionContent className="bg-[#f0f2ef] px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    We Are Here And Ready To Chat
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-white text-base font-medium capitalize text-brand-navy-muted hover:bg-white hover:text-brand-navy"
                    aria-label="Start chat with Modimal customer care"
                  >
                    Start Chat
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="call" className="border-b border-brand-border">
              <AccordionTrigger className="rounded-none bg-[#d9e0d6] px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-brand **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-[#f0f2ef]">
                <span className="flex flex-1 items-center gap-3 text-left">
                  <Headphones
                    className="size-5 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Call Us
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
              <AccordionContent className="bg-[#f0f2ef] px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    We&apos;re Here To Talk To You
                  </p>
                  <Button
                    render={<Link href="tel:+19294603208" />}
                    nativeButton={false}
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-white text-base font-medium text-brand-navy hover:bg-white"
                  >
                    +1 (929) 460-3208
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="email" className="border-0">
              <AccordionTrigger className="rounded-none bg-[#d9e0d6] px-4 py-4 text-base font-medium text-brand-navy hover:no-underline focus-visible:ring-2 focus-visible:ring-brand **:data-[slot=accordion-trigger-icon]:hidden data-panel-open:bg-[#f0f2ef]">
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
              <AccordionContent className="bg-[#f0f2ef] px-4 pb-6">
                <div className="flex flex-col items-center gap-4 py-2 text-center">
                  <p className="text-sm capitalize text-brand-navy">
                    We Are Here And Ready To Help
                  </p>
                  <Button
                    render={<Link href="mailto:hello@modimal.com" />}
                    nativeButton={false}
                    variant="outline"
                    className="h-11 w-full max-w-xs rounded-none border-ink/40 bg-white text-base font-medium capitalize text-brand-navy hover:bg-white"
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
            <article className="flex h-full flex-col items-center bg-[#f0f2ef] px-6 py-8 text-center">
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
                className="mt-6 h-11 w-full rounded-none border-brand text-base font-medium capitalize text-brand hover:bg-brand hover:text-white"
                aria-label="Start chat with Modimal customer care"
              >
                Start Chat
              </Button>
            </article>
          </li>
          <li>
            <article className="flex h-full flex-col items-center bg-[#f0f2ef] px-6 py-8 text-center">
              <Headphones
                className="size-7 text-brand-navy"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-brand-navy">Call Us</h2>
              <p className="mt-2 text-sm text-brand-navy-muted">
                We&apos;re here to talk to you
              </p>
              <Button
                render={<Link href="tel:+19294603208" />}
                nativeButton={false}
                variant="outline"
                className="mt-6 h-11 w-full rounded-none border-brand text-base font-medium text-brand hover:bg-brand hover:text-white"
              >
                +1 (929) 460-3208
              </Button>
            </article>
          </li>
          <li>
            <article className="flex h-full flex-col items-center bg-[#f0f2ef] px-6 py-8 text-center">
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
                render={<Link href="mailto:hello@modimal.com" />}
                nativeButton={false}
                variant="outline"
                className="mt-6 h-11 w-full rounded-none border-brand text-base font-medium capitalize text-brand hover:bg-brand hover:text-white"
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
