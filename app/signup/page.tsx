'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export default function SignUp() {
  const router = useRouter()
  const [userType, setUserType] = useState('client')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  })

  const validateField = (name: string, value: string) => {
    let error = ''
    switch (name) {
      case 'name':
        if (value.length < 2) error = 'Le nom doit contenir au moins 2 caractères'
        break
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Adresse e-mail invalide'
        break
      case 'phone':
        if (!/^\d{9,}$/.test(value)) error = 'Numéro de téléphone invalide'
        break
      case 'password':
        if (value.length < 8) error = 'Le mot de passe doit contenir au moins 8 caractères'
        break
      case 'confirmPassword':
        if (value !== formData.password) error = 'Les mots de passe ne correspondent pas'
        break
      case 'address':
        if (value.length < 5) error = 'L\'adresse doit contenir au moins 5 caractères'
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Valider tous les champs
    Object.keys(formData).forEach(key => validateField(key, formData[key as keyof typeof formData]))

    // Vérifier s'il y a des erreurs
    if (Object.values(errors).some(error => error !== '')) {
      setIsLoading(false)
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      })
      return
    }

    // Simuler une requête d'inscription
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsLoading(false)
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès. Vous allez être redirigé vers votre tableau de bord.",
    })

    // Rediriger vers le tableau de bord approprié
    router.push(userType === 'client' ? '/dashboard/client' : '/dashboard/transporter')
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Entrez vos informations ci-dessous pour créer votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="123456789"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse complète</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>
            <RadioGroup defaultValue="client" onValueChange={setUserType} className="grid gap-2 mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client">Client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transporter" id="transporter" />
                <Label htmlFor="transporter">Transporteur</Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="idDocument">Pièce d'identité (Passeport ou CNI)</Label>
              <Input id="idDocument" type="file" accept="image/*,.pdf" required />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="photo">Photo récente</Label>
              <Input id="photo" type="file" accept="image/*" required />
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            En vous inscrivant, vous acceptez nos{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Conditions d'utilisation
            </a>
            {" "}et notre{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Politique de confidentialité
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

