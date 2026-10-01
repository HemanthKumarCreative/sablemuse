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
          "max-w-[calc(100%-1.5rem)] gap-0 rounded-none border-0 bg-white p-0 ring-0 sm:max-w-[520px] md:max-w-[560px]",
          "shadow-[0_16px_48px_rgba(12,12,12,0.16)]",
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
            <DialogTitle className="font-sans text-xl font-semibold capitalize leading-[1.4] text-brand-navy sm:text-2xl md:text-[2rem]">
              Welcome To Sable Muse
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-3 font-display text-base italic leading-[1.6] text-brand-navy sm:mt-4 sm:text-lg md:text-xl">
            Elegance In Simplicity, Earth’s Harmony
          </DialogDescription>

          <p className="mt-6 text-sm capitalize leading-[1.6] text-brand-navy sm:mt-8 sm:text-base md:text-xl md:font-semibold">
            Is It Your First Experience At Sable Muse?
          </p>

          <Button
            render={<Link href="/collection/new-arrivals" onClick={handleDismiss} />}
            nativeButton={false}
            className="mt-6 h-12 w-full max-w-[320px] rounded-none bg-brand text-sm font-medium capitalize text-white hover:bg-brand/90 sm:mt-8 sm:max-w-[360px] sm:text-base"
          >
            Explore New Arrivals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
