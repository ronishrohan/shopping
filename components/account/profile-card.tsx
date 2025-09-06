"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Save, X, Camera } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { User } from "@/lib/types"

export function ProfileCard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(user)

  if (!user || !editedUser) {
    return null
  }

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Information</CardTitle>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {editedUser.profilePicture ? (
                <Image
                  src={editedUser.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-muted-foreground">
                  {editedUser.firstName.charAt(0)}
                  {editedUser.lastName.charAt(0)}
                </span>
              )}
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-transparent"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {editedUser.firstName} {editedUser.lastName}
            </h3>
            <p className="text-muted-foreground">{editedUser.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                value={editedUser.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            ) : (
              <p className="text-sm py-2">{editedUser.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                value={editedUser.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            ) : (
              <p className="text-sm py-2">{editedUser.lastName}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedUser.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <p className="text-sm py-2">{editedUser.email}</p>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Products Listed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground">Items Purchased</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">4.8</p>
            <p className="text-sm text-muted-foreground">Seller Rating</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
