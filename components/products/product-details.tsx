"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2 } from "lucide-react"
import { AddToCartButton } from "./add-to-cart-button"
import type { Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.title} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-primary">${product.price}</span>
          {product.workingCondition && (
            <Badge variant="secondary" className="text-sm">
              {product.workingCondition}
            </Badge>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Product Details</h4>
            <div className="space-y-2 text-sm">
              {product.brand && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand:</span>
                  <span>{product.brand}</span>
                </div>
              )}
              {product.model && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span>{product.model}</span>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span>{product.color}</span>
                </div>
              )}
              {product.size && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{product.size}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Condition & Packaging</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition:</span>
                <span>{product.workingCondition || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original Packaging:</span>
                <span>{product.originalPackaging ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manual/Instructions:</span>
                <span>{product.manualInstructions ? "Included" : "Not included"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Quantity:</span>
                <span>{product.quantity}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Add to Cart Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-input rounded-md px-3 py-1 text-sm"
            >
              {Array.from({ length: Math.min(product.quantity, 10) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <AddToCartButton productId={product.id} quantity={quantity} size="lg" className="flex-1" />
          <Button variant="outline" onClick={handleWishlist} size="lg">
            <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          <Button variant="outline" onClick={handleShare} size="lg">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
