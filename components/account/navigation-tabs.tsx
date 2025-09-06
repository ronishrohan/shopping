"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Package, ShoppingBag, Plus } from "lucide-react"

const navigationItems = [
  {
    name: "Profile",
    href: "/account",
    icon: User,
  },
  {
    name: "My Listings",
    href: "/account/listings",
    icon: Package,
  },
  {
    name: "My Purchases",
    href: "/account/purchases",
    icon: ShoppingBag,
  },
  {
    name: "Sell Product",
    href: "/sell",
    icon: Plus,
  },
]

export function NavigationTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <nav className="flex space-x-8 overflow-x-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
