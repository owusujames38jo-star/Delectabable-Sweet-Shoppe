import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'ddst_cart_v1'

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

function clampQty(qty) {
  const n = Number(qty)
  if (!Number.isFinite(n)) return 1
  return Math.max(1, Math.min(99, Math.round(n)))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? safeParse(raw, null) : null
    return Array.isArray(parsed) ? parsed : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, qty = 1, options = {}) => {
    const quantity = clampQty(qty)
    const key = `${product.id}:${options?.variantId ?? 'base'}`
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.key === key)
      if (idx === -1) {
        return [
          ...prev,
          {
            key,
            productId: product.id,
            name: product.name,
            priceCents: product.priceCents,
            image: product.image,
            variantLabel: options?.variantLabel ?? null,
            variantId: options?.variantId ?? null,
            qty: quantity,
          },
        ]
      }
      const next = [...prev]
      next[idx] = { ...next[idx], qty: clampQty(next[idx].qty + quantity) }
      return next
    })
  }, [])

  const setQty = useCallback((key, qty) => {
    const quantity = clampQty(qty)
    setItems((prev) =>
      prev.map((x) => (x.key === key ? { ...x, qty: quantity } : x))
    )
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((x) => x.key !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotalCents = useCallback(
    () => items.reduce((sum, x) => sum + x.priceCents * x.qty, 0),
    [items]
  )

  const itemCount = useCallback(
    () => items.reduce((n, x) => n + x.qty, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      setQty,
      removeItem,
      clear,
      subtotalCents,
      itemCount,
    }),
    [items, addItem, setQty, removeItem, clear, subtotalCents, itemCount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

