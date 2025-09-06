import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "./add-to-cart-button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer bg-card p-8">
      <div className="text-center mb-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 tracking-widest uppercase hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-lg font-medium mb-3">${product.price}</p>
        <div className="text-xs text-gray-500 tracking-wider">
          <p className="uppercase">{product.brand || "Premium"}</p>
          <p className="uppercase line-clamp-1">{product.description}</p>
        </div>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="aspect-square w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=300&width=300"}
            alt={product.title}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      <div className="text-center">
        <AddToCartButton productId={product.id} size="sm" className="text-xs font-medium tracking-wider" />
      </div>
    </div>
  )
}
