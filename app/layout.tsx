import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'PROXIMO - Plateforme de livraison collaborative',
  description: 'Connectez-vous avec des transporteurs locaux pour des livraisons rapides et efficaces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-secondary border-t border-border py-6 text-center">
              <p className="text-muted-foreground">&copy; 2024 PROXIMO. Tous droits réservés.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

