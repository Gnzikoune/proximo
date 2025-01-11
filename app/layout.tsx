import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-gray-100 p-4 text-center">
              <p>&copy; 2023 PROXIMO. Tous droits réservés.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

