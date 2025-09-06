"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthContextType } from "@/lib/types"
import { AuthService } from "@/lib/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const user = await AuthService.login(email, password)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    setLoading(true)
    try {
      const user = await AuthService.signup(userData)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
