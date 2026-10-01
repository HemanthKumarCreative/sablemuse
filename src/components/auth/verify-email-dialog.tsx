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
          "max-w-[calc(100%-1.5rem)] gap-0 rounded-none border-0 bg-white p-0 ring-0 sm:max-w-[560px] md:max-w-[640px]",
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
              className="absolute top-3 left-3 z-10 rounded-none text-brand-navy hover:bg-transparent sm:top-4 sm:left-4"
            />
          }
        >
          <X className="size-5 sm:size-6" strokeWidth={1.5} />
        </DialogClose>

        <div className="px-5 pt-14 pb-10 text-center sm:px-10 sm:pt-16 sm:pb-12 md:px-16 md:pt-20 md:pb-16">
          <DialogHeader className="items-center gap-0">
            <DialogTitle className="font-sans text-xl font-semibold capitalize leading-[1.4] text-brand-navy sm:text-2xl md:text-[2rem]">
              Verify Your Email
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-5 text-sm capitalize leading-[1.8] text-brand-navy sm:mt-6 sm:text-base md:text-xl">
            We’ve sent an email to{" "}
            <span className="font-medium">{displayEmail}</span> to verify your
            email address and activate your account. The link in the email will
            expire in 24 hours.
          </DialogDescription>

          <p className="mt-6 text-sm capitalize leading-[1.8] text-brand-navy sm:mt-8 sm:text-base">
            <button
              type="button"
              onClick={handleChangeEmail}
              className="font-medium text-brand-light transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Click Here
            </button>{" "}
            if you did not receive an email or would like to change the email
            address you registered with.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
