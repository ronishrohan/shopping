"use client"

import { Header } from "@/components/layout/header"
import { NavigationTabs } from "@/components/account/navigation-tabs"
import { ListingsGrid } from "@/components/account/listings-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"

export default function ListingsPage() {
  const { user } = useAuth()

  // Filter products by current user (mock data)
  const userListings = mockProducts.filter((product) => product.sellerId === user?.id).slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Listings</h1>
              <p className="text-muted-foreground">Manage your product listings</p>
            </div>
            <Button asChild>
              <Link href="/sell">
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Link>
            </Button>
          </div>
        </div>

        <NavigationTabs />

        <div className="mt-8">
          <ListingsGrid products={userListings} />
        </div>
      </main>
    </div>
  )
}
