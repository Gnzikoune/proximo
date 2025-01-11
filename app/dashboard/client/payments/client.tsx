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
  Globe,
  ChevronRight
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
        <Button onClick={onSubmit} className="w-full h-12 text-base">
          Confirmer le paiement
        </Button>
      </div>
    </div>
  )
}

function CardPaymentForm({ method, amount, onSubmit }: PaymentFormProps) {
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
            />
            <CardIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
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
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            Vos informations de paiement sont sécurisées
          </p>
        </div>
        <Button onClick={onSubmit} className="w-full h-12 text-base">
          Payer {amount.toLocaleString('fr-FR')} FCFA
        </Button>
      </div>
    </div>
  )
}

function OnlinePaymentForm({ method, amount, onSubmit }: PaymentFormProps) {
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
        <Button onClick={onSubmit} className="w-full h-12 text-base">
          Continuer vers {method.name}
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

  const groupedPaymentMethods = {
    mobile: paymentMethods.filter(m => m.type === 'mobile'),
    card: paymentMethods.filter(m => m.type === 'card'),
    online: paymentMethods.filter(m => m.type === 'online')
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Paiements</h1>

        {/* Paiements en attente */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Paiements en attente
          </h2>
          {pendingPayments.length === 0 ? (
            <Card className="p-6">
              <p className="text-gray-500 text-center">Aucun paiement en attente</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingPayments.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Livraison #{request.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {request.payment.amount.toLocaleString('fr-FR')} FCFA
                      </p>
                      <Button size="sm" className="mt-2" onClick={() => handlePayNow(request)}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payer maintenant
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t text-sm grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Destination:</span>
                      <p>{request.destination}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <p className="flex items-center gap-1">
                        {request.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Livré
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-yellow-500" />
                            En cours
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Historique des paiements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Historique des paiements
          </h2>
          {completedPayments.length === 0 ? (
            <Card className="p-6">
              <p className="text-gray-500 text-center">Aucun paiement effectué</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedPayments.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Livraison #{request.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {request.payment.amount.toLocaleString('fr-FR')} FCFA
                      </p>
                      <p className="text-sm text-green-600 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Payé
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t text-sm grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Destination:</span>
                      <p>{request.destination}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <p className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Livré
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Informations de paiement */}
        <Card className="p-6 bg-gray-50">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold">Informations de paiement</h3>
              <p className="text-sm text-gray-600">
                Les paiements sont sécurisés et traités instantanément. 
                Vous recevrez une confirmation par email après chaque transaction.
              </p>
              <p className="text-sm text-gray-600">
                Modes de paiement acceptés : PayPal, Stripe, Airtel Money, MobiCash, Orange Money, Wave, Free Money, Cartes bancaires
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMethod ? `Payer avec ${selectedMethod.name}` : 'Choisir un mode de paiement'}
            </DialogTitle>
          </DialogHeader>
          {!selectedMethod ? (
            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                <TabsTrigger value="card">Carte</TabsTrigger>
                <TabsTrigger value="online">En ligne</TabsTrigger>
              </TabsList>
              <TabsContent value="mobile" className="mt-4">
                <div className="grid gap-3">
                  {groupedPaymentMethods.mobile.map((method) => (
                    <button
                      key={method.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      onClick={() => handlePaymentMethodSelect(method)}
                    >
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="card" className="mt-4">
                <div className="grid gap-3">
                  {groupedPaymentMethods.card.map((method) => (
                    <button
                      key={method.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      onClick={() => handlePaymentMethodSelect(method)}
                    >
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="online" className="mt-4">
                <div className="grid gap-3">
                  {groupedPaymentMethods.online.map((method) => (
                    <button
                      key={method.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      onClick={() => handlePaymentMethodSelect(method)}
                    >
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            renderPaymentForm()
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 