'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Settings, Plus } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'client' | 'transporter' | 'admin'
  status: 'active' | 'inactive'
  isAvailable?: boolean
}

const mockUsers: User[] = [
  {
    id: 'CL-1',
    name: 'John Client',
    email: 'john@client.com',
    phone: '+221 77 000 00 01',
    role: 'client',
    status: 'active'
  },
  {
    id: 'TR-1',
    name: 'Bob Transport',
    email: 'bob@transport.com',
    phone: '+221 77 000 00 02',
    role: 'transporter',
    status: 'active',
    isAvailable: true
  }
]

export function UsersTab() {
  const [users] = useState<User[]>(mockUsers)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Gestion des utilisateurs</h3>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </div>

        <div className="grid gap-4">
          {/* Clients */}
          <div>
            <h4 className="font-medium mb-3">Clients</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(u => u.role === 'client').map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Transporteurs */}
          <div>
            <h4 className="font-medium mb-3">Transporteurs</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(u => u.role === 'transporter').map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant={user.isAvailable ? 'default' : 'secondary'}>
                        {user.isAvailable ? 'Disponible' : 'Indisponible'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 