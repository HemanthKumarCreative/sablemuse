"use client"

import { Mail, X } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

type WriteUsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export const WriteUsDialog = ({
  open,
  onOpenChange,
  className,
}: WriteUsDialogProps) => {
  const handleSubmitted = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-h-[min(90vh,720px)] w-[calc(100%-2rem)] max-w-[380px] gap-0 overflow-y-auto rounded-none border-0 bg-white p-0 ring-0 sm:max-w-[400px]",
          "shadow-[0_16px_48px_rgba(12,12,12,0.24)]",
          className
        )}
        overlayClassName="bg-ink/70 supports-backdrop-filter:backdrop-blur-[1px]"
      >
        <DialogHeader className="flex flex-row items-center justify-between gap-3 px-5 pt-5 pb-2">
          <DialogTitle className="flex items-center gap-3 text-lg font-semibold text-brand-navy">
            <Mail className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Write Us
          </DialogTitle>
          <DialogDescription className="sr-only">
            Send a message to Modimal customer care
          </DialogDescription>
          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close write us form"
                className="size-9 shrink-0 rounded-none text-brand-navy hover:bg-transparent"
              />
            }
          >
            <X className="size-5" strokeWidth={1.5} />
          </DialogClose>
        </DialogHeader>

        <div className="px-5 pt-2 pb-6">
          <ContactForm variant="modal" onSubmitted={handleSubmitted} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
