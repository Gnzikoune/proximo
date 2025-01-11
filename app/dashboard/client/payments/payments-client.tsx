'use client'

import { useState } from 'react'
import { useRequestStore } from '@/store/requestStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone,
  CreditCard as CardIcon,
  Wallet,
  Globe
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  type: 'mobile' | 'card' | 'online'
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    description: 'Paiement sécurisé via PayPal',
    type: 'online'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: <CardIcon className="w-6 h-6 text-purple-500" />,
    description: 'Paiement par carte via Stripe',
    type: 'card'
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    icon: <Smartphone className="w-6 h-6 text-red-600" />,
    description: 'Paiement via Airtel Money',
    type: 'mobile'
  },
  {
    id: 'mobicash',
    name: 'MobiCash',
    icon: <Wallet className="w-6 h-6 text-green-600" />,
    description: 'Paiement via MobiCash',
    type: 'mobile'
  },
  {
    id: 'orange-money',
    name: 'Orange Money',
    icon: <Smartphone className="w-6 h-6 text-orange-500" />,
    description: 'Paiement via Orange Money',
    type: 'mobile'
  },
  {
    id: 'wave',
    name: 'Wave',
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    description: 'Paiement via Wave',
    type: 'mobile'
  },
  {
    id: 'free-money',
    name: 'Free Money',
    icon: <Smartphone className="w-6 h-6 text-red-500" />,
    description: 'Paiement via Free Money',
    type: 'mobile'
  },
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: <CardIcon className="w-6 h-6 text-gray-500" />,
    description: 'Paiement par carte bancaire',
    type: 'card'
  }
]

interface PaymentFormProps {
  method: PaymentMethod
  amount: number
  onSubmit: () => void
}

function MobileMoneyForm({ method, amount, onSubmit }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Numéro de téléphone</Label>
        <Input id="phone" type="tel" placeholder="7X XXX XX XX" />
      </div>
      <p className="text-sm text-gray-500">
        Vous allez recevoir une demande de paiement de {amount.toLocaleString('fr-FR')} FCFA sur votre téléphone.
      </p>
      <Button onClick={onSubmit} className="w-full">Confirmer</Button>
    </div>
  )
}

function CardPaymentForm({ method, amount, onSubmit }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card">Numéro de carte</Label>
        <Input id="card" type="text" placeholder="4242 4242 4242 4242" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Date d'expiration</Label>
          <Input id="expiry" type="text" placeholder="MM/YY" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" type="text" placeholder="123" />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">Payer {amount.toLocaleString('fr-FR')} FCFA</Button>
    </div>
  )
}

function OnlinePaymentForm({ method, amount, onSubmit }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Vous allez être redirigé vers {method.name} pour finaliser votre paiement de {amount.toLocaleString('fr-FR')} FCFA.
      </p>
      <Button onClick={onSubmit} className="w-full">
        Continuer vers {method.name}
      </Button>
    </div>
  )
}

export default function PaymentsClient() {
  const requests = useRequestStore((state) => state.requests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  
  const pendingPayments = requests.filter(r => r.payment.status === 'pending')
  const completedPayments = requests.filter(r => r.payment.status === 'completed')

  const handlePayNow = (request: any) => {
    setSelectedRequest(request)
    setSelectedMethod(null)
    setShowPaymentDialog(true)
  }

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method)
  }

  const handlePaymentSubmit = () => {
    // TODO: Implement payment processing
    console.log(`Processing payment for request ${selectedRequest?.id} with method ${selectedMethod?.id}`)
    setShowPaymentDialog(false)
    setSelectedMethod(null)
  }

  const renderPaymentForm = () => {
    if (!selectedMethod || !selectedRequest) return null

    const props = {
      method: selectedMethod,
      amount: selectedRequest.payment.amount,
      onSubmit: handlePaymentSubmit
    }

    switch (selectedMethod.type) {
      case 'mobile':
        return <MobileMoneyForm {...props} />
      case 'card':
        return <CardPaymentForm {...props} />
      case 'online':
        return <OnlinePaymentForm {...props} />
      default:
        return null
    }
  }

  // ... (rest of the component remains the same until the Dialog)

  return (
    <>
      <div className="space-y-6">
        {/* ... (previous JSX remains the same) ... */}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedMethod ? `Payer avec ${selectedMethod.name}` : 'Choisir un mode de paiement'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!selectedMethod ? (
              paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-colors"
                  onClick={() => handlePaymentMethodSelect(method)}
                >
                  {method.icon}
                  <div className="text-left">
                    <h4 className="font-medium">{method.name}</h4>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </button>
              ))
            ) : (
              renderPaymentForm()
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 