import { create, type StateCreator } from 'zustand'
import { persist, type PersistOptions } from 'zustand/middleware'

export interface Request {
  id: string
  status: 'pending' | 'in_progress' | 'completed'
  destination: string
  date: string
  amount: number
  weight: number
  dimensions: string
  contentType: string
  sender: {
    name: string
    contact: string
    address: string
  }
  recipient: {
    name: string
    contact: string
    address: string
  }
  pickup: {
    address: string
    datetime: string
  }
  delivery: {
    address: string
    datetime: string
  }
  validationCode: string
  carrier?: {
    name: string
    transportType: string
    vehicleInfo: string
  }
  payment: {
    amount: number
    status: 'pending' | 'completed'
  }
  trackingUrl: string
}

interface RequestStore {
  requests: Request[]
  addRequest: (request: Request) => void
  getRequestsByStatus: (status: Request['status']) => Request[]
}

type RequestStorePersist = (
  config: StateCreator<RequestStore>,
  options: PersistOptions<RequestStore>
) => StateCreator<RequestStore>

export const useRequestStore = create<RequestStore>()(
  (persist as RequestStorePersist)(
    (set, get) => ({
      requests: [],
      addRequest: (request: Request) => 
        set((state) => ({ requests: [...state.requests, request] })),
      getRequestsByStatus: (status: Request['status']) => 
        get().requests.filter((request) => request.status === status)
    }),
    {
      name: 'request-store'
    }
  )
) 