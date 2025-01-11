// Constantes pour le calcul des frais
const BASE_PRICE = 2000 // Prix de base en FCFA
const PRICE_PER_KM = 100 // Prix par kilomètre
const WEIGHT_PRICE_MULTIPLIER = 200 // Prix par kg
const URGENT_DELIVERY_MULTIPLIER = 1.5 // Multiplicateur pour livraison urgente

// Zones et leurs multiplicateurs de prix
const ZONE_MULTIPLIERS = {
  'urbaine': 1,
  'periurbaine': 1.2,
  'rurale': 1.5
} as const

// Types de contenu et leurs multiplicateurs
const CONTENT_TYPE_MULTIPLIERS = {
  'standard': 1,
  'fragile': 1.3,
  'valeur': 1.5,
  'refrigere': 1.8
} as const

interface DeliveryDetails {
  weight: number
  dimensions: string
  contentType: keyof typeof CONTENT_TYPE_MULTIPLIERS
  distance: number
  zone: keyof typeof ZONE_MULTIPLIERS
  isUrgent: boolean
}

export function calculateDeliveryCost(details: DeliveryDetails): number {
  // Calcul du prix de base avec la distance
  let totalCost = BASE_PRICE + (details.distance * PRICE_PER_KM)

  // Ajout du coût basé sur le poids
  totalCost += details.weight * WEIGHT_PRICE_MULTIPLIER

  // Multiplicateur de zone
  totalCost *= ZONE_MULTIPLIERS[details.zone]

  // Multiplicateur de type de contenu
  totalCost *= CONTENT_TYPE_MULTIPLIERS[details.contentType]

  // Multiplicateur de livraison urgente
  if (details.isUrgent) {
    totalCost *= URGENT_DELIVERY_MULTIPLIER
  }

  // Arrondir au 100 FCFA le plus proche
  return Math.ceil(totalCost / 100) * 100
}

// Fonction pour estimer la distance entre deux adresses (simulation)
export function estimateDistance(pickup: string, delivery: string): number {
  // Ici, vous pourriez intégrer un service de géocodage réel comme Google Maps
  // Pour l'exemple, nous utilisons une simulation simple
  const addresses: Record<string, { lat: number; lng: number }> = {
    'dakar': { lat: 14.7167, lng: -17.4677 },
    'thies': { lat: 14.7910, lng: -16.9359 },
    'mbour': { lat: 14.4167, lng: -16.9667 },
    'rufisque': { lat: 14.7167, lng: -17.2667 },
  }

  // Fonction pour calculer la distance entre deux points (formule de Haversine)
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Simplification pour la démonstration
  const pickupLower = pickup.toLowerCase()
  const deliveryLower = delivery.toLowerCase()

  if (addresses[pickupLower] && addresses[deliveryLower]) {
    return calculateDistance(
      addresses[pickupLower].lat,
      addresses[pickupLower].lng,
      addresses[deliveryLower].lat,
      addresses[deliveryLower].lng
    )
  }

  // Distance par défaut si les adresses ne sont pas dans notre base
  return 10
}

// Fonction pour déterminer la zone en fonction de l'adresse
export function determineZone(address: string): keyof typeof ZONE_MULTIPLIERS {
  const urbanCities = ['dakar', 'thies', 'rufisque']
  const periurbanCities = ['mbour', 'sebikotane', 'diamniadio']
  
  const addressLower = address.toLowerCase()
  
  if (urbanCities.some(city => addressLower.includes(city))) {
    return 'urbaine'
  } else if (periurbanCities.some(city => addressLower.includes(city))) {
    return 'periurbaine'
  }
  
  return 'rurale'
} 