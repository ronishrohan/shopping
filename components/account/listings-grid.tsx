"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { Package } from "lucide-react" // Import the Package component

interface ListingsGridProps {
  products: Product[]
}

export function ListingsGrid({ products }: ListingsGridProps) {
  const [listings, setListings] = useState(products)
  const { toast } = useToast()

  const handleDelete = (productId: string) => {
    setListings((prev) => prev.filter((product) => product.id !== productId))
    toast({
      title: "Product deleted",
      description: "Your product listing has been removed.",
    })
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" /> {/* Use the Package component */}
        <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
        <p className="text-muted-foreground mb-4">Start selling by creating your first product listing.</p>
        <Button asChild>
          <Link href="/sell">Create Listing</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((product) => (
        <Card key={product.id} className="group">
          <CardContent className="p-0">
            <div className="aspect-square relative overflow-hidden rounded-t-lg">
              <Image
                src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                  {product.quantity > 0 ? "Active" : "Out of Stock"}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="w-8 h-8 bg-background/80">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/products/${product.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Product
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/sell/edit/${product.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Listing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Listing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <div className="w-full">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">${product.price}</span>
                <span className="text-xs text-muted-foreground">{product.quantity} in stock</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
