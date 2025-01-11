'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from '@/components/ui/use-toast'
import { Send } from 'lucide-react'

export default function Support() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'envoi du message
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Aide et support</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Foire aux questions</CardTitle>
          <CardDescription>Trouvez rapidement des réponses à vos questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Comment fonctionne PROXIMO ?</AccordionTrigger>
              <AccordionContent>
                PROXIMO est une plateforme de livraison collaborative qui met en relation des clients ayant besoin de livrer des colis avec des transporteurs locaux. Les clients créent des demandes de livraison, et les transporteurs peuvent les accepter et effectuer la livraison.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Comment devenir transporteur sur PROXIMO ?</AccordionTrigger>
              <AccordionContent>
                Pour devenir transporteur, vous devez vous inscrire sur la plateforme en tant que transporteur, fournir les documents nécessaires (pièce d'identité, permis de conduire, etc.) et passer par un processus de vérification. Une fois approuvé, vous pourrez commencer à accepter des livraisons.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Comment sont calculés les frais de livraison ?</AccordionTrigger>
              <AccordionContent>
                Les frais de livraison sont calculés en fonction de la distance, du poids et des dimensions du colis, ainsi que du type de véhicule nécessaire pour la livraison. Un tarif de base est appliqué, auquel s'ajoutent des frais variables selon ces critères.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Que faire en cas de problème avec une livraison ?</AccordionTrigger>
              <AccordionContent>
                En cas de problème avec une livraison, vous pouvez contacter notre service client via le formulaire de contact ci-dessous ou en utilisant l'option "Signaler un problème" dans l'interface de suivi de votre livraison. Nous traiterons votre demande dans les plus brefs délais.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contactez-nous</CardTitle>
          <CardDescription>Besoin d'aide supplémentaire ? Envoyez-nous un message</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Envoyer le message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

