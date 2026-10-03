"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react"
import {
  addToCartAction,
  fetchCart,
  removeCartLineAction,
  updateCartLineAction,
  clearCartAction,
} from "@/lib/shopify/cart/actions"
import type { CartItem, CartSummary } from "@/types/commerce"

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  checkoutUrl: string
  isHydrated: boolean
  isPending: boolean
  bagOpen: boolean
  setBagOpen: (open: boolean) => void
  openBag: () => void
  addItem: (input: {
    merchandiseId: string
    quantity?: number
  }) => Promise<CartSummary>
  removeItem: (lineId: string) => Promise<void>
  incrementItem: (lineId: string) => Promise<void>
  decrementItem: (lineId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

type CartProviderProps = {
  children: ReactNode
  initialCart?: CartSummary
}

export const CartProvider = ({ children, initialCart }: CartProviderProps) => {
  const [cart, setCart] = useState<CartSummary>(
    initialCart ?? {
      id: "",
      checkoutUrl: "",
      totalQuantity: 0,
      subtotal: 0,
      currencyCode: "USD",
      items: [],
    }
  )
  const [isHydrated, setIsHydrated] = useState(Boolean(initialCart))
  const [isAdding, setIsAdding] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const refreshCart = useCallback(async () => {
    const next = await fetchCart()
    setCart(next)
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (initialCart) {
      return
    }

    void refreshCart()
  }, [initialCart, refreshCart])

  const addItem = useCallback(
    async (input: { merchandiseId: string; quantity?: number }) => {
      setIsAdding(true)
      try {
        const next = await addToCartAction(input)
        setCart(next)
        return next
      } finally {
        setIsAdding(false)
      }
    },
    []
  )

  const removeItem = useCallback(async (lineId: string) => {
    startTransition(() => {
      void (async () => {
        const next = await removeCartLineAction(lineId)
        setCart(next)
      })()
    })
  }, [])

  const incrementItem = useCallback(
    async (lineId: string) => {
      const line = cart.items.find((item) => item.id === lineId)
      if (!line) {
        return
      }

      startTransition(() => {
        void (async () => {
          const next = await updateCartLineAction({
            lineId,
            quantity: line.quantity + 1,
          })
          setCart(next)
        })()
      })
    },
    [cart.items]
  )

  const decrementItem = useCallback(
    async (lineId: string) => {
      const line = cart.items.find((item) => item.id === lineId)
      if (!line) {
        return
      }

      startTransition(() => {
        void (async () => {
          const next = await updateCartLineAction({
            lineId,
            quantity: line.quantity - 1,
          })
          setCart(next)
        })()
      })
    },
    [cart.items]
  )

  const clearCart = useCallback(async () => {
    startTransition(() => {
      void (async () => {
        await clearCartAction()
        setCart({
          id: "",
          checkoutUrl: "",
          totalQuantity: 0,
          subtotal: 0,
          currencyCode: "USD",
          items: [],
        })
      })()
    })
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items: cart.items,
      itemCount: cart.totalQuantity,
      subtotal: cart.subtotal,
      checkoutUrl: cart.checkoutUrl,
      isHydrated,
      isPending: isPending || isAdding,
      bagOpen,
      setBagOpen,
      openBag: () => setBagOpen(true),
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      refreshCart,
    }),
    [
      cart,
      isHydrated,
      isPending,
      isAdding,
      bagOpen,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      refreshCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}
