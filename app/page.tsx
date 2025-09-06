"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/filters/product-filters"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Filter, SortAsc } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }

  const handleFiltersChange = (filters: {
    sortBy: string
    priceRange: [number, number]
    category: string
    condition: string
  }) => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.categoryId === filters.category)
    }

    // Apply condition filter
    if (filters.condition !== "all") {
      filtered = filtered.filter((product) => product.workingCondition === filters.condition)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 sm:mb-8">
          <span className="text-black">Home Page</span>
        </div>

        {/* Hero Section - Made responsive with smaller text on mobile */}
        <section className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 tracking-wider">
            MARKETPLACE
          </h1>
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Discover unique products from trusted sellers around the world
            </p>
          </div>
        </section>

        {/* Categories Section - Made scrollable on mobile */}
        <section className="mb-12 sm:mb-16">
          <div className="flex justify-center space-x-4 sm:space-x-8 mb-8 sm:mb-12 overflow-x-auto pb-2">
            {mockCategories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                className="text-xs sm:text-sm font-medium pb-1 text-gray-500 hover:text-black border-b-2 border-transparent hover:border-black transition-colors whitespace-nowrap"
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          {/* Mobile Filter/Sort Controls - Added mobile-specific filter and sort buttons */}
          <div className="flex justify-between items-center mb-6 sm:mb-8 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  FILTERS
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter products by category, price, and condition</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <ProductFilters onFiltersChange={handleFiltersChange} />
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <SortAsc className="w-4 h-4" />
              SORT BY
            </Button>
          </div>

          {/* Desktop Filter/Sort Controls - Hidden on mobile */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <button className="text-sm font-medium flex items-center">FILTERS +</button>
            <button className="text-sm font-medium flex items-center">SORT BY +</button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters Sidebar - Hidden on mobile, shown as modal */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Products"}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">{filteredProducts.length} products found</p>
              </div>
              <ProductGrid products={filteredProducts} loading={loading} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
