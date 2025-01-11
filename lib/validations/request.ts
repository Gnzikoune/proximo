import * as z from 'zod'

export const requestSchema = z.object({
  destination: z.string()
    .min(2, 'La destination doit contenir au moins 2 caractères')
    .max(100, 'La destination ne peut pas dépasser 100 caractères'),
  amount: z.number()
    .min(1000, 'Le montant minimum est de 1000 FCFA')
    .max(1000000, 'Le montant maximum est de 1,000,000 FCFA'),
  description: z.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(500, 'La description ne peut pas dépasser 500 caractères')
    .optional(),
  pickupAddress: z.string()
    .min(5, 'L\'adresse de ramassage doit contenir au moins 5 caractères')
    .max(200, 'L\'adresse de ramassage ne peut pas dépasser 200 caractères'),
})

export type RequestFormData = z.infer<typeof requestSchema>

export const requestResponseSchema = requestSchema.extend({
  id: z.string(),
  status: z.enum(['pending', 'in_progress', 'delivered']),
  date: z.string().datetime(),
  userId: z.string(),
}) 