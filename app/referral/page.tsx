'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Copy, Gift, Users } from 'lucide-react'

export default function Referral() {
  const [referralCode, setReferralCode] = useState('PROXIMO123')
  const [referrals] = useState([
    { id: 1, name: 'Alice Diop', date: '2023-06-01', status: 'Inscrit' },
    { id: 2, name: 'Moussa Sow', date: '2023-06-05', status: 'En attente' },
    { id: 3, name: 'Fatou Diallo', date: '2023-06-10', status: 'Inscrit' },
  ])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Code copié",
      description: "Le code de parrainage a été copié dans le presse-papiers.",
    })
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Programme de parrainage</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Votre code de parrainage</CardTitle>
          <CardDescription>Partagez ce code avec vos amis pour gagner des récompenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={referralCode} readOnly />
            <Button onClick={copyReferralCode} size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des parrainages</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {referrals.map((referral) => (
              <li key={referral.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <p className="text-sm text-muted-foreground">{referral.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  referral.status === 'Inscrit' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {referral.status}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vos récompenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Gift className="h-10 w-10 text-primary" />
            <div>
              <p className="text-2xl font-bold">5000 FCFA</p>
              <p className="text-sm text-muted-foreground">de crédit PROXIMO</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Inviter plus d'amis
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

