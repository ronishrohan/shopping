"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/filters/product-filters"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find((c) => c.id === params.id)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (category) {
      const categoryProducts = mockProducts.filter((product) => product.categoryId === category.id)
      setProducts(categoryProducts)
      setFilteredProducts(categoryProducts)
    }
  }, [category])

  if (!category) {
    notFound()
  }

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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${category.name} Products`}
              </h2>
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
            </div>
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  )
}
