"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "cn"

const WELCOME_STORAGE_KEY = "sablemuse-welcome-dismissed"

type WelcomeDialogProps = {
  className?: string
}

export const WelcomeDialog = ({ className }: WelcomeDialogProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = window.localStorage.getItem(WELCOME_STORAGE_KEY)

    if (dismissed === "true") {
      return
    }

    setOpen(true)
  }, [])

  const handleDismiss = () => {
    window.localStorage.setItem(WELCOME_STORAGE_KEY, "true")
    setOpen(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleDismiss()
      return
    }

    setOpen(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-[calc(100%-1.5rem)] gap-0 rounded-none border-0 bg-background p-0 ring-0 sm:max-w-[520px] md:max-w-[560px]",
          className
        )}
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close welcome"
              className="absolute top-3 right-3 z-10 rounded-none text-brand-navy hover:bg-transparent sm:top-4 sm:right-4"
            />
          }
        >
          <X className="size-5 sm:size-6" strokeWidth={1.5} />
        </DialogClose>

        <div className="px-5 pt-14 pb-10 text-center sm:px-10 sm:pt-16 sm:pb-12 md:px-14 md:pt-20 md:pb-16">
          <DialogHeader className="items-center gap-0">
            <DialogTitle className="heading-page capitalize">
              Welcome To Sable Muse
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-3 font-display text-base italic leading-[1.6] text-brand-navy sm:mt-4 sm:text-lg md:text-xl">
            Dresses, Tops, Jeans, And Matching Sets. Prices In US Dollars.
          </DialogDescription>

          <p className="mt-6 text-sm capitalize leading-[1.6] text-brand-navy sm:mt-8 sm:text-base md:text-xl md:font-semibold">
            Is It Your First Experience At Sable Muse?
          </p>

          <Button
            render={<Link href="/collection/new-arrivals" onClick={handleDismiss} />}
            nativeButton={false}
            size="xl"
            className="mt-6 w-full max-w-[320px] sm:mt-8 sm:max-w-[360px]"
          >
            Explore New Arrivals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
