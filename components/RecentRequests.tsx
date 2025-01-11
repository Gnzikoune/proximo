import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Request {
  id: string
  status: 'pending' | 'in_progress' | 'delivered'
  destination: string
  date: string
  amount: number
}

interface RecentRequestsProps {
  requests: Request[]
}

const statusMap = {
  pending: { label: 'En attente', color: 'bg-yellow-500' },
  in_progress: { label: 'En cours', color: 'bg-blue-500' },
  delivered: { label: 'Livrée', color: 'bg-green-500' }
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <p className="font-medium">{request.destination}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(request.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <Badge variant="secondary" className={statusMap[request.status].color}>
                    {statusMap[request.status].label}
                  </Badge>
                  <p className="text-sm font-medium">{request.amount.toLocaleString('fr-FR')} FCFA</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 