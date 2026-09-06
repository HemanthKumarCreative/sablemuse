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

const WELCOME_STORAGE_KEY = "modimal-welcome-dismissed"

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
          "max-w-[calc(100%-2rem)] gap-0 rounded-none border-0 bg-white p-0 ring-0 sm:max-w-[560px]",
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
              className="absolute top-4 left-4 z-10 rounded-none text-ink hover:bg-transparent"
            />
          }
        >
          <X className="size-6" strokeWidth={1.5} />
        </DialogClose>

        <div className="px-8 pt-16 pb-12 text-center md:px-14 md:pt-20 md:pb-16">
          <DialogHeader className="items-center gap-0">
            <DialogTitle className="font-sans text-2xl font-bold capitalize leading-[1.4] text-ink md:text-[2rem]">
              Welcome To Modimal
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-4 font-display text-lg italic leading-[1.6] text-ink md:text-xl">
            Elegance In Simplicity, Earth’s Harmony
          </DialogDescription>

          <p className="mt-8 text-base font-bold capitalize leading-[1.4] text-ink md:text-xl">
            Is It Your First Experience On Modimal?
          </p>

          <Button
            render={<Link href="/collection" onClick={handleDismiss} />}
            nativeButton={false}
            className="mt-8 h-12 w-full max-w-[360px] rounded-none bg-brand text-sm font-medium tracking-[0.04em] text-white uppercase hover:bg-brand/90 md:text-base"
          >
            Create Your Own Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
