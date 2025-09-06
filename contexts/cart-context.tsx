"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: string, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "ecommerce_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items])

  const addToCart = (productId: string, quantity = 1) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId)

      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.quantity) }
            : item,
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Math.random().toString(36).substr(2, 9),
          userId: "current-user", // In real app, this would be the actual user ID
          productId,
          product,
          quantity: Math.min(quantity, product.quantity),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.product) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.quantity),
            updatedAt: new Date(),
          }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
