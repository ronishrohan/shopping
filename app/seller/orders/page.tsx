import { Header } from "@/components/layout/header"
import { OrderManagement } from "@/components/seller/order-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SellerOrdersPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-muted-foreground">Track and manage your customer orders</p>
          </div>

          <OrderManagement />
        </main>
      </div>
    </ProtectedRoute>
  )
}
