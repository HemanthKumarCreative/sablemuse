"use client"

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

type VerifyEmailDialogProps = {
  open: boolean
  email: string
  onOpenChange: (open: boolean) => void
  onChangeEmail?: () => void
  className?: string
}

export const VerifyEmailDialog = ({
  open,
  email,
  onOpenChange,
  onChangeEmail,
  className,
}: VerifyEmailDialogProps) => {
  const displayEmail = email.trim() || "nina@gmail.com"

  const handleChangeEmail = () => {
    onOpenChange(false)
    onChangeEmail?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-[calc(100%-2rem)] gap-0 rounded-none border-0 bg-white p-0 ring-0 sm:max-w-[640px]",
          "shadow-[0_16px_48px_rgba(12,12,12,0.16)]",
          className
        )}
        aria-describedby={undefined}
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close"
              className="absolute top-4 left-4 z-10 rounded-none text-ink hover:bg-transparent"
            />
          }
        >
          <X className="size-6" strokeWidth={1.5} />
        </DialogClose>

        <div className="px-8 pt-16 pb-12 text-center md:px-16 md:pt-20 md:pb-16">
          <DialogHeader className="items-center gap-0">
            <DialogTitle className="font-sans text-2xl font-bold capitalize leading-[1.4] text-ink md:text-[2rem]">
              Verify Your Email Address
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-6 text-base capitalize leading-[1.8] text-ink md:text-xl">
            We’ve sent an email to{" "}
            <span className="font-medium">{displayEmail}</span> to verify your
            email address and activate your account. The link in the email will
            expire in 24 hours.
          </DialogDescription>

          <p className="mt-8 text-sm capitalize leading-[1.8] text-ink-muted md:text-base">
            <button
              type="button"
              onClick={handleChangeEmail}
              className="font-medium text-ink underline underline-offset-2 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Click Here
            </button>{" "}
            if you did not receive an email or would like to change the email
            address you registered with
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
