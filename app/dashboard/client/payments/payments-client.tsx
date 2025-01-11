'use client'

import { useState } from 'react'
import { useRequestStore } from '@/store/requestStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone,
  CreditCard as CardIcon,
  Wallet,
  Globe,
  ChevronRight
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
  isProcessing: boolean
}

function MobileMoneyForm({ method, amount, onSubmit, isProcessing }: PaymentFormProps) {
  const handleSubmit = () => {
    // Simuler une vérification du numéro de téléphone
    const phoneInput = document.getElementById('phone') as HTMLInputElement
    if (!phoneInput.value || phoneInput.value.length < 9) {
      toast({
        title: "Erreur de paiement",
        description: "Veuillez entrer un numéro de téléphone valide.",
        variant: "destructive",
      })
      return
    }
    onSubmit()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{amount.toLocaleString('fr-FR')} FCFA</p>
          <p className="text-sm text-gray-500">Montant à payer</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <div className="relative">
            <Input 
              id="phone" 
              type="tel" 
              placeholder="7X XXX XX XX"
              className="pl-12"
              disabled={isProcessing}
            />
            <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            Vous allez recevoir une demande de paiement sur votre téléphone.
          </p>
        </div>
        <Button onClick={handleSubmit} className="w-full h-12 text-base" disabled={isProcessing}>
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Traitement en cours...
            </div>
          ) : (
            "Confirmer le paiement"
          )}
        </Button>
      </div>
    </div>
  )
}

function CardPaymentForm({ method, amount, onSubmit, isProcessing }: PaymentFormProps) {
  const handleSubmit = () => {
    // Simuler une vérification des informations de carte
    const cardInput = document.getElementById('card') as HTMLInputElement
    const expiryInput = document.getElementById('expiry') as HTMLInputElement
    const cvcInput = document.getElementById('cvc') as HTMLInputElement

    if (!cardInput.value || !expiryInput.value || !cvcInput.value) {
      toast({
        title: "Erreur de paiement",
        description: "Veuillez remplir tous les champs de paiement.",
        variant: "destructive",
      })
      return
    }
    onSubmit()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{amount.toLocaleString('fr-FR')} FCFA</p>
          <p className="text-sm text-gray-500">Montant à payer</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card">Numéro de carte</Label>
          <div className="relative">
            <Input 
              id="card" 
              type="text" 
              placeholder="4242 4242 4242 4242"
              className="pl-12"
              disabled={isProcessing}
            />
            <CardIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Date d'expiration</Label>
            <Input id="expiry" type="text" placeholder="MM/YY" disabled={isProcessing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" type="text" placeholder="123" disabled={isProcessing} />
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            Vos informations de paiement sont sécurisées
          </p>
        </div>
        <Button onClick={handleSubmit} className="w-full h-12 text-base" disabled={isProcessing}>
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Traitement en cours...
            </div>
          ) : (
            `Payer ${amount.toLocaleString('fr-FR')} FCFA`
          )}
        </Button>
      </div>
    </div>
  )
}

function OnlinePaymentForm({ method, amount, onSubmit, isProcessing }: PaymentFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{amount.toLocaleString('fr-FR')} FCFA</p>
          <p className="text-sm text-gray-500">Montant à payer</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            Vous allez être redirigé vers {method.name} pour finaliser votre paiement en toute sécurité.
          </p>
        </div>
        <Button onClick={onSubmit} className="w-full h-12 text-base" disabled={isProcessing}>
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Redirection en cours...
            </div>
          ) : (
            `Continuer vers ${method.name}`
          )}
        </Button>
      </div>
    </div>
  )
}

export default function PaymentsClient() {
  const requests = useRequestStore((state) => state.requests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
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

  const handleCloseDialog = () => {
    if (!isProcessing) {
      setShowPaymentDialog(false)
      setSelectedMethod(null)
    }
  }

  const handlePaymentSubmit = () => {
    setIsProcessing(true)
    // Simuler le traitement du paiement
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% de chance de succès
      
      if (success) {
        toast({
          title: "Paiement réussi",
          description: `Votre paiement de ${selectedRequest?.payment.amount.toLocaleString('fr-FR')} FCFA a été effectué avec succès.`,
        })
        setShowPaymentDialog(false)
        setSelectedMethod(null)
      } else {
        toast({
          title: "Échec du paiement",
          description: "Le paiement n'a pas pu être effectué. Veuillez réessayer ou choisir un autre mode de paiement.",
          variant: "destructive",
        })
      }
      setIsProcessing(false)
    }, 2000)
  }

  const renderPaymentForm = () => {
    if (!selectedMethod || !selectedRequest) return null

    const props = {
      method: selectedMethod,
      amount: selectedRequest.payment.amount,
      onSubmit: handlePaymentSubmit,
      isProcessing
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

      <Dialog open={showPaymentDialog} onOpenChange={handleCloseDialog}>
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
                  disabled={isProcessing}
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