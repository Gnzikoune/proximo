'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

type StarRatingProps = {
  rating: number
  setRating: (rating: number) => void
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function Evaluation() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simuler une requête d'envoi d'évaluation
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsLoading(false)
    toast({
      title: "Évaluation envoyée",
      description: "Merci pour votre évaluation !",
    })

    router.push('/dashboard/client')
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Évaluez votre expérience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Note</Label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Commentaire</Label>
              <Textarea
                id="comment"
                placeholder="Partagez votre expérience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || rating === 0}>
              {isLoading ? 'Envoi en cours...' : 'Envoyer l\'évaluation'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

