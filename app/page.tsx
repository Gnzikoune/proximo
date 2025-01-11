import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Clock, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12 py-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Bienvenue sur PROXIMO</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">La plateforme de livraison collaborative qui connecte clients et transporteurs locaux pour des livraisons rapides, fiables et économiques.</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/signup">S'inscrire</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
        </div>
      </section>

      {/* <section className="bg-secondary rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Comment ça marche ?</h2>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="Vidéo explicative de PROXIMO"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section> */}

      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">Pourquoi choisir PROXIMO ?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Package className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Livraison rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Profitez de livraisons express grâce à notre réseau de transporteurs locaux.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Truck className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Transporteurs vérifiés</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Tous nos transporteurs sont soigneusement sélectionnés et vérifiés pour votre sécurité.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Suivi en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Suivez vos colis en temps réel et recevez des notifications à chaque étape.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Assurance incluse</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Vos colis sont assurés pendant toute la durée du transport pour votre tranquillité d'esprit.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">Témoignages</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">"PROXIMO a révolutionné ma façon de gérer mes livraisons. C'est rapide, fiable et économique !"</p>
              <p className="font-semibold">- Marie D., Cliente satisfaite</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">"Grâce à PROXIMO, j'optimise mes trajets et augmente mes revenus. Une excellente plateforme pour les transporteurs !"</p>
              <p className="font-semibold">- Thomas L., Transporteur partenaire</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Prêt à commencer ?</h2>
        <Button size="lg" asChild>
          <Link href="/signup">Rejoignez PROXIMO aujourd'hui</Link>
        </Button>
      </section>
    </div>
  )
}

