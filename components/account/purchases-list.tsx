"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Star, ShoppingBag } from "lucide-react"
import type { Purchase } from "@/lib/types"

interface PurchasesListProps {
  purchases: Purchase[]
}

export function PurchasesList({ purchases }: PurchasesListProps) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
        <p className="text-muted-foreground mb-4">Start shopping to see your purchase history here.</p>
        <Button asChild>
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <Card key={purchase.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                {purchase.product?.images?.[0] ? (
                  <Image
                    src={purchase.product.images[0] || "/placeholder.svg"}
                    alt={purchase.product.title || "Product"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{purchase.product?.title || "Product"}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Quantity: {purchase.quantity} • Total: ${purchase.totalPrice}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        purchase.status === "completed"
                          ? "default"
                          : purchase.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/products/${purchase.productId}`}>View Product</Link>
                  </Button>
                  {purchase.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-2" />
                      Rate & Review
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
