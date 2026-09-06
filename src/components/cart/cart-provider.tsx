"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  CART_STORAGE_KEY,
  SAMPLE_CART_ITEMS,
  getCartItemKey,
  type CartItem,
} from "@/data/cart"

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isHydrated: boolean
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

type CartProviderProps = {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(SAMPLE_CART_ITEMS)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)

      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]

        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      setItems(SAMPLE_CART_ITEMS)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, isHydrated])

  const addItem = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      const id = getCartItemKey(item.productId, item.size, item.color)
      const quantityToAdd = item.quantity ?? 1

      setItems((current) => {
        const existing = current.find((entry) => entry.id === id)

        if (existing) {
          return current.map((entry) =>
            entry.id === id
              ? { ...entry, quantity: entry.quantity + quantityToAdd }
              : entry
          )
        }

        return [
          ...current,
          {
            ...item,
            id,
            quantity: quantityToAdd,
          },
        ]
      })
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const incrementItem = useCallback((id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }, [])

  const decrementItem = useCallback((id: string) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id) {
          return [item]
        }

        if (item.quantity <= 1) {
          return []
        }

        return [{ ...item, quantity: item.quantity - 1 }]
      })
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isHydrated,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isHydrated,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}
