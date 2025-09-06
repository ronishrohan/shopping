import { Header } from "@/components/layout/header"
import { ProductForm } from "@/components/products/product-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SellPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">List a New Product</h1>
            <p className="text-muted-foreground">Fill out the form below to list your product for sale</p>
          </div>

          <ProductForm />
        </main>
      </div>
    </ProtectedRoute>
  )
}
