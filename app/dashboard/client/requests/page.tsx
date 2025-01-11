'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRequestStore } from '@/store/requestStore'
import { Plus } from 'lucide-react'

function RequestStatus({ status }: { status: string }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      status === 'completed' 
        ? 'bg-green-100 text-green-800'
        : status === 'in_progress'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status === 'completed' 
        ? 'Complété'
        : status === 'in_progress'
        ? 'En cours'
        : 'En attente'}
    </span>
  )
}

export default function ClientRequests() {
  const requests = useRequestStore((state) => state.requests)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mes demandes</h1>
        <Button asChild>
          <Link href="/dashboard/client/requests/new-request" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle demande
          </Link>
        </Button>
      </div>

      {/* Vue mobile (cards) */}
      <div className="grid gap-4 md:hidden">
        {requests.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-gray-500">Aucune demande pour le moment</p>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="font-mono text-sm">{request.id.slice(0, 8)}...</p>
                </div>
                <RequestStatus status={request.status} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm">{new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Montant</p>
                  <p className="text-sm">{request.payment.amount.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Destination</p>
                  <p className="text-sm">{request.recipient.address}</p>
                </div>
              </div>

              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href={`/dashboard/client/requests/${request.id}`}>
                  Voir les détails
                </Link>
              </Button>
            </Card>
          ))
        )}
      </div>

      {/* Vue desktop (tableau) */}
      <div className="hidden md:block">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Aucune demande pour le moment
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono">{request.id.slice(0, 8)}...</TableCell>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{request.recipient.address}</TableCell>
                    <TableCell>
                      <RequestStatus status={request.status} />
                    </TableCell>
                    <TableCell>{request.payment.amount.toLocaleString('fr-FR')} FCFA</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/client/requests/${request.id}`}>
                          Voir les détails
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
} 