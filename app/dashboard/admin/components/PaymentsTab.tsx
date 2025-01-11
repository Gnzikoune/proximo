'use client'

import { useRequestStore } from '@/store/requestStore'
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
import { Download, Filter, Eye } from 'lucide-react'

export function PaymentsTab() {
  const requests = useRequestStore((state) => state.requests)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Suivi des paiements</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Demande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.filter(r => r.payment).map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono">{request.id}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{request.sender.name}</TableCell>
                  <TableCell>{request.payment.amount.toLocaleString('fr-FR')} FCFA</TableCell>
                  <TableCell>
                    <Badge variant={request.payment.status === 'completed' ? 'default' : 'secondary'}>
                      {request.payment.status === 'completed' ? 'Payé' : 'En attente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 