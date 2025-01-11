'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

type UserRole = 'client' | 'transporter' | 'admin'

interface User {
  id: string
  email: string
  role: UserRole
  name: string
  phone: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulation d'une connexion
      // En production, ceci serait un appel API
      let role: UserRole = 'client'
      let name = 'John Client'
      
      if (email.includes('admin')) {
        role = 'admin'
        name = 'Admin Proximo'
      } else if (email.includes('transport')) {
        role = 'transporter'
        name = 'John Transport'
      }

      const mockUser: User = {
        id: 'USER-123',
        email,
        role,
        name,
        phone: '+221 77 000 00 00'
      }
      
      setUser(mockUser)
      
      // Redirection en fonction du rôle
      switch (mockUser.role) {
        case 'admin':
          router.push('/dashboard/admin')
          break
        case 'transporter':
          router.push('/dashboard/transporter')
          break
        default:
          router.push('/dashboard/client')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}

