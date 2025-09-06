import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProductForm } from "@/components/products/product-form"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { mockProducts } from "@/lib/mock-data"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
            <p className="text-muted-foreground">Update your product information</p>
          </div>

          <ProductForm product={product} isEditing={true} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
