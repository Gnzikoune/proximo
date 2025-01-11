'use client'

import { RoleGuard } from '@/components/auth/RoleGuard'

export default function TransporterDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRole="transporter">
      {children}
    </RoleGuard>
  )
} 