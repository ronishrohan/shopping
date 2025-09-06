import { Header } from "@/components/layout/header"
import { SellerDashboard } from "@/components/seller/seller-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SellerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and track your sales</p>
          </div>

          <SellerDashboard />
        </main>
      </div>
    </ProtectedRoute>
  )
}
