'use client'

import { RoleGuard } from '@/components/auth/RoleGuard'

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRole="client">
      {children}
    </RoleGuard>
  )
} 