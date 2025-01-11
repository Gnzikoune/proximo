'use client'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { MobileNav } from '@/components/dashboard/MobileNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation mobile */}
      <div className="sticky top-0 z-50 flex items-center border-b bg-white p-4 md:hidden">
        <MobileNav />
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold">Proximo</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar pour desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Contenu principal */}
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 