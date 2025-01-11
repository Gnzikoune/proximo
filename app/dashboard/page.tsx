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
    return <div>Chargement...</div>
  }

  return null
}

