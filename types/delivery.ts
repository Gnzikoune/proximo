export interface DeliveryParty {
  name: string
  address: string
  contact: string
}

export interface Carrier {
  id: string
  name: string
  transportType: string
  contact: string
  vehicleInfo?: string
}

export interface Package {
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  contentType: string
  isFragile: boolean
}

export interface Payment {
  amount: number
  status: 'pending' | 'paid'
  currency: string
}

export interface TrackingPoint {
  timestamp: string
  location: {
    latitude: number
    longitude: number
  }
  status: string
  description: string
}

export interface DeliveryQRData {
  id: string
  validationCode: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  package: Package
  sender: DeliveryParty
  recipient: DeliveryParty
  carrier?: Carrier
  payment: Payment
  tracking: TrackingPoint[]
  // Version pour la compatibilité
  version: '1.0'
} 