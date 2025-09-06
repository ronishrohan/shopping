"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { CartItem } from "@/lib/types"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  if (!item.product) {
    return null
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <Link href={`/products/${item.productId}`} className="flex-shrink-0">
            <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                alt={item.product.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.productId}`}>
              <h3 className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                {item.product.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.product.description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="font-bold text-primary">${item.product.price}</span>
              <div className="flex items-center space-x-2">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-transparent"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= item.product.quantity}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                {/* Remove Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-destructive hover:text-destructive bg-transparent"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
