"use client"

import Link from "next/link"
import { useLayoutEffect, useRef, useState } from "react"
import { ShoppingBag, X } from "lucide-react"
import { CartLineItem } from "@/components/cart/cart-line-item"
import { useCart } from "@/components/cart/cart-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

const EMPTY_BAG_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "New In", href: "/new-in" },
  { label: "Best Sellers", href: "/collection/best-sellers" },
] as const

type BagSheetProps = {
  className?: string
  triggerClassName?: string
}

export const BagSheet = ({ className, triggerClassName }: BagSheetProps) => {
  const {
    items,
    itemCount,
    decrementItem,
    incrementItem,
    removeItem,
    bagOpen,
    setBagOpen,
  } = useCart()
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isEmpty = items.length === 0

  useLayoutEffect(() => {
    const update = () => {
      setVisible((rootRef.current?.getClientRects().length ?? 0) > 0)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!visible) {
      return
    }

    setBagOpen(open)
  }

  return (
    <div ref={rootRef}>
    <Sheet open={bagOpen && visible} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              itemCount > 0
                ? `Shopping bag, ${itemCount} items`
                : "Shopping bag"
            }
            className={cn("relative rounded-none text-brand-navy", triggerClassName)}
          />
        }
      >
        <ShoppingBag className="size-5" strokeWidth={1.5} />
        {itemCount > 0 ? (
          <Badge
            variant="inverse"
            className="absolute top-1.5 right-1.5 size-4 p-0 text-xs font-semibold leading-none"
          >
            {itemCount > 9 ? "9+" : itemCount}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-screen max-w-none gap-0 rounded-none border-l border-brand-border bg-background p-0 opacity-100 data-starting-style:opacity-100 data-[side=right]:w-screen data-[side=right]:max-w-none sm:max-w-[500px] sm:data-[side=right]:w-[min(100vw,500px)]",
          className
        )}
      >
        <SheetClose
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close shopping bag"
              className="absolute top-3 left-3 z-10 rounded-none text-brand-navy"
            />
          }
        >
          <X className="size-6" strokeWidth={1.5} />
        </SheetClose>

        {isEmpty ? (
          <>
            <SheetTitle className="sr-only">Shopping bag</SheetTitle>
            <SheetDescription className="sr-only">
              Your shopping bag is currently empty
            </SheetDescription>
            <div className="flex h-full flex-col items-center px-8 pt-24 pb-10 text-center sm:px-10 sm:pt-28">
              <h2 className="heading-section max-w-[280px] capitalize leading-tight">
                Your Shopping Bag Is Empty
              </h2>
              <p className="mt-4 max-w-[260px] text-sm leading-[1.7] capitalize text-brand-navy sm:mt-5 sm:text-base">
                Discover Sable Muse And Add Products To Your Bag
              </p>
              <ul
                className="mt-10 flex w-full max-w-[280px] flex-col gap-4 sm:mt-12 sm:gap-5"
                role="list"
              >
                {EMPTY_BAG_LINKS.map((link) => (
                  <li key={link.label}>
                    <SheetClose
                      render={
                        <Link
                          href={link.href}
                          className="flex h-12 w-full items-center justify-center bg-brand px-6 text-base font-semibold uppercase tracking-eyebrow text-ink transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <SheetTitle className="sr-only">Your cart</SheetTitle>
            <SheetDescription className="sr-only">
              Review items in your shopping bag
            </SheetDescription>
            <div className="flex h-full flex-col">
              <div className="px-6 py-5">
                <h2 className="text-center text-xl font-semibold text-brand-navy">
                  Your Cart
                </h2>
              </div>

              <ul
                className="flex-1 space-y-8 overflow-y-auto px-5 py-2 sm:px-6 sm:py-4"
                role="list"
              >
                {items.map((item) => (
                  <li key={item.id}>
                    <CartLineItem
                      item={item}
                      onIncrement={incrementItem}
                      onDecrement={decrementItem}
                      onRemove={removeItem}
                    />
                  </li>
                ))}
              </ul>

              <div className="p-5 sm:p-6">
                <SheetClose
                  render={
                    <Link
                      href="/cart"
                      className="flex h-12 w-full items-center justify-center bg-brand px-6 text-base font-semibold uppercase tracking-eyebrow text-ink transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  }
                >
                  Check Out
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
    </div>
  )
}
