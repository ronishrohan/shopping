"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-wider hidden sm:block">MARKETPLACE</span>
          <span className="font-bold text-lg tracking-wider sm:hidden">MP</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-black"
            />
          </div>
        </form>

        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="icon" asChild className="relative hover:bg-transparent">
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-black text-white">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/listings">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/purchases">My Purchases</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sell">Sell Product</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="hover:bg-transparent text-sm font-medium">
                <Link href="/login">LOGIN</Link>
              </Button>
              <Button asChild className="bg-black text-white hover:bg-gray-800 text-sm font-medium">
                <Link href="/signup">SIGN UP</Link>
              </Button>
            </div>
          )}
        </nav>

        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild className="relative hover:bg-transparent">
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-black text-white">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-transparent"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-black"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            {user ? (
              <div className="space-y-2">
                <Link
                  href="/account"
                  className="block py-2 text-sm font-medium hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/account/listings"
                  className="block py-2 text-sm font-medium hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  href="/account/purchases"
                  className="block py-2 text-sm font-medium hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Purchases
                </Link>
                <Link
                  href="/sell"
                  className="block py-2 text-sm font-medium hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sell Product
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block py-2 text-sm font-medium hover:text-gray-600 text-left w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block py-2 text-sm font-medium hover:text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LOGIN
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 text-sm font-medium bg-black text-white px-4 rounded hover:bg-gray-800 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
