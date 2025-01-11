import { NextResponse } from 'next/server'
import { requestSchema } from '@/lib/validations/request'
import { ZodError } from 'zod'

// Mock data
const mockRequests = [
  {
    id: '1',
    status: 'pending',
    destination: 'Dakar',
    date: new Date().toISOString(),
    amount: 5000,
    description: 'Livraison urgente',
    pickupAddress: '123 Rue Principal, Dakar'
  },
  {
    id: '2',
    status: 'in_progress',
    destination: 'Thiès',
    date: new Date(Date.now() - 86400000).toISOString(),
    amount: 3500,
    description: 'Colis fragile',
    pickupAddress: '45 Avenue Central, Thiès'
  },
  {
    id: '3',
    status: 'delivered',
    destination: 'Saint-Louis',
    date: new Date(Date.now() - 172800000).toISOString(),
    amount: 7500,
    description: 'Livraison standard',
    pickupAddress: '78 Boulevard Maritime, Saint-Louis'
  }
]

export async function GET() {
  try {
    return NextResponse.json(mockRequests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    const newRequest = {
      ...validatedData,
      id: (mockRequests.length + 1).toString(),
      status: 'pending' as const,
      date: new Date().toISOString(),
      description: validatedData.description || 'Aucune description'
    }

    // Simulate adding to database
    mockRequests.unshift(newRequest)

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 422 }
      )
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 