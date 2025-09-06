"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { mockProducts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  productId: string
  quantity?: number
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

export function AddToCartButton({
  productId,
  quantity = 1,
  size = "default",
  className,
  children,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return

    addToCart(productId, quantity)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} size={size} className={cn(className)}>
      {children || (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
