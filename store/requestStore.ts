import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Request {
  id: string
  createdAt: string
  updatedAt: string
  status: 'pending' | 'accepted' | 'completed' | 'cancelled'
  sender: {
    name: string
    address: string
    phone: string
  }
  recipient: {
    name: string
    address: string
    phone: string
  }
  package: {
    weight: number
    dimensions: {
      length: number
      width: number
      height: number
    }
    type: string
    description: string
  }
  payment: {
    amount: number
    status: 'pending' | 'completed'
  }
  carrier?: {
    id: string
    name: string
    phone: string
  }
}

interface RequestStore {
  requests: Request[]
  addRequest: (request: Request) => void
  updateRequest: (id: string, updates: Partial<Request>) => void
  getRequestsByStatus: (status: Request['status']) => Request[]
}

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      requests: [],
      addRequest: (request) => set((state) => ({
        requests: [...state.requests, request]
      })),
      updateRequest: (id, updates) => set((state) => ({
        requests: state.requests.map((request) =>
          request.id === id
            ? { ...request, ...updates, updatedAt: new Date().toISOString() }
            : request
        )
      })),
      getRequestsByStatus: (status) => {
        return get().requests.filter((request) => request.status === status)
      }
    }),
    {
      name: 'request-store'
    }
  )
) 