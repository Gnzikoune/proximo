'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLink {
  href: string
  label: string
}

const clientLinks: NavLink[] = [
  { href: '/dashboard/client', label: 'Tableau de bord' },
  { href: '/dashboard/client/requests', label: 'Mes demandes' },
  { href: '/dashboard/client/payments', label: 'Paiements' },
  { href: '/dashboard/client/profile', label: 'Profil' },
]

const transporterLinks: NavLink[] = [
  { href: '/dashboard/transporter', label: 'Tableau de bord' },
  { href: '/dashboard/transporter/deliveries', label: 'Livraisons' },
  { href: '/dashboard/transporter/earnings', label: 'Revenus' },
  { href: '/dashboard/transporter/profile', label: 'Profil' },
]

const adminLinks: NavLink[] = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/users', label: 'Utilisateurs' },
  { href: '/admin/requests', label: 'Demandes' },
  { href: '/admin/settings', label: 'Paramètres' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  const links = user?.role === 'client' 
    ? clientLinks 
    : user?.role === 'transporteur' 
    ? transporterLinks 
    : adminLinks

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.role === 'client' 
                ? 'Espace Client'
                : user?.role === 'transporteur'
                ? 'Espace Transporteur'
                : 'Administration'}
            </h2>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm rounded-lg',
                      pathname === link.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-700">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 