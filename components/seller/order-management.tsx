"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  productTitle: string
  buyerName: string
  quantity: number
  totalPrice: number
  status: "pending" | "processing" | "shipped" | "delivered"
  orderDate: Date
}

export function OrderManagement() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      productTitle: "Wireless Bluetooth Headphones",
      buyerName: "John Doe",
      quantity: 1,
      totalPrice: 199.99,
      status: "pending",
      orderDate: new Date("2024-01-20"),
    },
    {
      id: "2",
      productTitle: "Smart Home Security Camera",
      buyerName: "Jane Smith",
      quantity: 2,
      totalPrice: 179.98,
      status: "processing",
      orderDate: new Date("2024-01-19"),
    },
    {
      id: "3",
      productTitle: "Vintage Leather Jacket",
      buyerName: "Mike Johnson",
      quantity: 1,
      totalPrice: 149.99,
      status: "shipped",
      orderDate: new Date("2024-01-18"),
    },
  ])

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Order updated",
      description: `Order status has been updated to ${newStatus}.`,
    })
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "outline"
      case "delivered":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{orders.filter((o) => o.status === "pending").length}</p>
            <p className="text-sm text-muted-foreground">Pending Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{orders.filter((o) => o.status === "processing").length}</p>
            <p className="text-sm text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{orders.filter((o) => o.status === "shipped").length}</p>
            <p className="text-sm text-muted-foreground">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{orders.filter((o) => o.status === "delivered").length}</p>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-medium text-sm">{order.productTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.buyerName} • Qty: {order.quantity} • ${order.totalPrice}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.orderDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  <Select
                    value={order.status}
                    onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
