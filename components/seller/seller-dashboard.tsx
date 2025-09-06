"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, DollarSign, Eye, Plus } from "lucide-react"
import Link from "next/link"

export function SellerDashboard() {
  // Mock seller statistics
  const stats = {
    totalListings: 12,
    activeListings: 10,
    totalViews: 1247,
    totalEarnings: 2849.99,
    thisMonthEarnings: 485.5,
    pendingOrders: 3,
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold">{stats.activeListings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${stats.thisMonthEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${stats.totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col space-y-2">
              <Link href="/sell">
                <Plus className="w-6 h-6" />
                <span>List New Product</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
              <Link href="/account/listings">
                <Package className="w-6 h-6" />
                <span>Manage Listings</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
              <Link href="/seller/orders">
                <TrendingUp className="w-6 h-6" />
                <span>View Orders</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">New order received</p>
                <p className="text-xs text-muted-foreground">Wireless Bluetooth Headphones - $199.99</p>
              </div>
              <Badge>New</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Product viewed</p>
                <p className="text-xs text-muted-foreground">Smart Home Security Camera - 15 views today</p>
              </div>
              <Badge variant="secondary">Views</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Payment received</p>
                <p className="text-xs text-muted-foreground">Vintage Leather Jacket - $149.99</p>
              </div>
              <Badge variant="outline">Paid</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
