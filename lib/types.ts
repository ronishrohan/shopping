export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  profilePicture?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  quantity: number
  categoryId: string
  category?: Category
  sellerId: string
  seller?: User
  brand?: string
  model?: string
  dimensions?: string
  color?: string
  size?: string
  originalPackaging?: boolean
  manualInstructions?: boolean
  workingCondition?: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  product?: Product
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export interface Purchase {
  id: string
  userId: string
  user?: User
  productId: string
  product?: Product
  quantity: number
  totalPrice: number
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => Promise<void>
  logout: () => void
  loading: boolean
}
