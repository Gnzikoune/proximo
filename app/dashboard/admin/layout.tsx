'use client'

import { RoleGuard } from '@/components/auth/RoleGuard'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRole="admin">
      {children}
    </RoleGuard>
  )
} 