'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { CreditCard, Smartphone, ShoppingCartIcon as PaypalIcon } from 'lucide-react'

type Transaction = {
  id: number
  date: string
  amount: number
  type: 'paiement' | 'remboursement'
  status: 'complété' | 'en_attente'
}

export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [transactions] = useState<Transaction[]>([
    { id: 1, date: '2023-06-15', amount: 50000, type: 'paiement', status: 'complété' },
    { id: 2, date: '2023-06-10', amount: 75000, type: 'paiement', status: 'complété' },
    { id: 3, date: '2023-06-05', amount: 25000, type: 'remboursement', status: 'en_attente' },
  ])

  const handleAddPaymentMethod = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({
      title: "Méthode de paiement ajoutée",
      description: "Votre nouvelle méthode de paiement a été ajoutée avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des paiements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter une méthode de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPaymentMethod} className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Carte bancaire
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile_money" id="mobile_money" />
                <Label htmlFor="mobile_money" className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile Money
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center">
                  <PaypalIcon className="mr-2 h-4 w-4" />
                  PayPal
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'card' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Date d'expiration</Label>
                    <Input id="expiryDate" placeholder="MM/AA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'mobile_money' && (
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                <Input id="phoneNumber" type="tel" placeholder="70 123 45 67" required />
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="space-y-2">
                <Label htmlFor="paypalEmail">Email PayPal</Label>
                <Input id="paypalEmail" type="email" placeholder="exemple@email.com" required />
              </div>
            )}

            <Button type="submit">Ajouter la méthode de paiement</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{transaction.date}</p>
                  <p className={transaction.type === 'paiement' ? 'text-red-500' : 'text-green-500'}>
                    {transaction.type === 'paiement' ? '-' : '+'}{transaction.amount.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  transaction.status === 'complété' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

