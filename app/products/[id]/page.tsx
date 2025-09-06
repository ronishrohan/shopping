import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProductImageCarousel } from "@/components/products/product-image-carousel"
import { ProductDetails } from "@/components/products/product-details"
import { ProductGrid } from "@/components/products/product-grid"
import { mockProducts } from "@/lib/mock-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageCarousel images={product.images} productTitle={product.title} />
          </div>

          {/* Product Information */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>
    </div>
  )
}
