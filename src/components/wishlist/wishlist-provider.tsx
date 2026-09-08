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

const WISHLIST_STORAGE_KEY = "modimal-wishlist"

type WishlistContextValue = {
  handles: string[]
  isHydrated: boolean
  isWishlisted: (handle: string) => boolean
  toggleWishlist: (handle: string) => void
  removeWishlist: (handle: string) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

type WishlistProviderProps = {
  children: ReactNode
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [handles, setHandles] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        if (Array.isArray(parsed)) {
          setHandles(parsed)
        }
      }
    } catch {
      setHandles([])
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(handles))
  }, [handles, isHydrated])

  const isWishlisted = useCallback(
    (handle: string) => handles.includes(handle),
    [handles]
  )

  const toggleWishlist = useCallback((handle: string) => {
    setHandles((current) =>
      current.includes(handle)
        ? current.filter((entry) => entry !== handle)
        : [...current, handle]
    )
  }, [])

  const removeWishlist = useCallback((handle: string) => {
    setHandles((current) => current.filter((entry) => entry !== handle))
  }, [])

  const value = useMemo(
    () => ({
      handles,
      isHydrated,
      isWishlisted,
      toggleWishlist,
      removeWishlist,
    }),
    [handles, isHydrated, isWishlisted, toggleWishlist, removeWishlist]
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider")
  }

  return context
}
