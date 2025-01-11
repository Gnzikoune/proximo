'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, QrCode, Package, LucideIcon } from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon?: LucideIcon
}

const clientLinks: NavLink[] = [
  { href: '/dashboard/client', label: 'Tableau de bord' },
  { href: '/dashboard/client/requests', label: 'Mes demandes' },
  { href: '/dashboard/client/payments', label: 'Paiements' }
]

const transporterLinks: NavLink[] = [
  {
    href: '/dashboard/transporter',
    label: 'Tableau de bord',
    icon: LayoutDashboard
  },
  {
    href: '/dashboard/transporter/validate',
    label: 'Valider une livraison',
    icon: QrCode
  },
  {
    href: '/dashboard/transporter/deliveries',
    label: 'Mes livraisons',
    icon: Package
  }
]

const adminLinks: NavLink[] = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/users', label: 'Utilisateurs' },
  { href: '/admin/requests', label: 'Demandes' },
  { href: '/admin/settings', label: 'Paramètres' },
]

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const links = user?.role === 'client' 
    ? clientLinks 
    : user?.role === 'transporteur' 
    ? transporterLinks 
    : adminLinks

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.role === 'client' 
              ? 'Espace Client'
              : user?.role === 'transporteur'
              ? 'Espace Transporteur'
              : 'Administration'}
          </h2>
        </div>
        
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors',
                    pathname === link.href
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4 mr-3" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-sm font-medium text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 