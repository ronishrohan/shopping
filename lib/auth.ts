import type { User } from "./types"

// Mock user storage (in real app, this would be handled by backend)
const USERS_KEY = "ecommerce_users"
const CURRENT_USER_KEY = "ecommerce_current_user"

export class AuthService {
  static getUsers(): User[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  static saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }

  static async login(email: string, password: string): Promise<User> {
    // Create a mock user for any email/password combination
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      password: password, // In real app, this would be hashed
      firstName: "Test",
      lastName: "User",
      phone: "123-456-7890",
      address: "123 Test Street",
      city: "Test City",
      state: "Test State",
      zipCode: "12345",
      country: "Test Country",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.setCurrentUser(mockUser)
    return mockUser
  }

  static async signup(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.setCurrentUser(newUser)
    return newUser
  }

  static logout(): void {
    this.setCurrentUser(null)
  }
}
