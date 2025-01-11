'use client'

import { createContext, useContext, ReactNode } from 'react'

interface User {
  id: string
  email: string
  role: 'client' | 'transporteur' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Pour la démo, on simule un utilisateur connecté
  const user: User = {
    id: 'CL-123',
    email: 'client@proximo.com',
    role: 'client'
  }

  return (
    <AuthContext.Provider value={{ user, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  )
}

