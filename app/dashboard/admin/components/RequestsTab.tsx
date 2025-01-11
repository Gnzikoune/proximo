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
import { Eye, Filter } from 'lucide-react'

export function RequestsTab() {
  const requests = useRequestStore((state) => state.requests)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Demandes de livraison</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Transporteur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono">{request.id}</TableCell>
                  <TableCell>{request.sender.name}</TableCell>
                  <TableCell>{request.recipient.address}</TableCell>
                  <TableCell>
                    {request.carrier ? request.carrier.name : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        request.status === 'completed' ? 'default' :
                        request.status === 'accepted' ? 'secondary' :
                        'outline'
                      }
                    >
                      {request.status === 'completed' ? 'Terminée' :
                       request.status === 'accepted' ? 'En cours' :
                       'En attente'}
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