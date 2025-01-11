'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRole: 'client' | 'transporter' | 'admin'
}

export function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (!loading && user && user.role !== allowedRole) {
      // Rediriger vers le bon dashboard si l'utilisateur est sur le mauvais
      if (pathname.includes('/dashboard')) {
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [user, loading, router, allowedRole, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // L'admin a accès à tous les dashboards
  if (user?.role === 'admin') {
    return <>{children}</>
  }

  if (!user || user.role !== allowedRole) {
    return null
  }

  return <>{children}</>
} 