'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      switch (user.role) {
        case 'client':
          router.push('/dashboard/client')
          break
        case 'transporteur':
          router.push('/dashboard/transporter')
          break
        case 'admin':
          router.push('/admin')
          break
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement de votre espace...</p>
        </div>
      </div>
    )
  }

  return null
}

