"use client"

import { Header } from "@/components/layout/header"
import { NavigationTabs } from "@/components/account/navigation-tabs"
import { PurchasesList } from "@/components/account/purchases-list"
import { mockProducts } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"
import type { Purchase } from "@/lib/types"

export default function PurchasesPage() {
  const { user } = useAuth()

  // Mock purchase data
  const mockPurchases: Purchase[] = [
    {
      id: "1",
      userId: user?.id || "",
      productId: "1",
      product: mockProducts[0],
      quantity: 1,
      totalPrice: 199.99,
      status: "completed",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      userId: user?.id || "",
      productId: "3",
      product: mockProducts[2],
      quantity: 2,
      totalPrice: 179.98,
      status: "completed",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
    },
    {
      id: "3",
      userId: user?.id || "",
      productId: "4",
      product: mockProducts[3],
      quantity: 1,
      totalPrice: 34.99,
      status: "pending",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
          <p className="text-muted-foreground">View your order history and track purchases</p>
        </div>

        <NavigationTabs />

        <div className="mt-8">
          <PurchasesList purchases={mockPurchases} />
        </div>
      </main>
    </div>
  )
}
