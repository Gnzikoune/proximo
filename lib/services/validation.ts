interface ValidationResult {
  success: boolean
  message: string
  timestamp: string
  location?: {
    latitude: number
    longitude: number
  }
}

interface ValidationHistory {
  requestId: string
  validationCode: string
  timestamp: string
  status: 'success' | 'failed'
  location?: {
    latitude: number
    longitude: number
  }
  validator: {
    id: string
    name: string
    role: string
  }
}

// Simule une base de données d'historique des validations
const validationHistory: ValidationHistory[] = []

export async function validateDeliveryCode(
  requestId: string,
  validationCode: string,
  validatorId: string
): Promise<ValidationResult> {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simuler la géolocalisation
  const location = await getCurrentLocation()

  // Simuler la validation (accepte si le code se termine par '123')
  const isValid = validationCode.endsWith('123')

  // Créer l'entrée d'historique
  const historyEntry: ValidationHistory = {
    requestId,
    validationCode,
    timestamp: new Date().toISOString(),
    status: isValid ? 'success' : 'failed',
    location,
    validator: {
      id: validatorId,
      name: 'John Doe',
      role: 'transporter'
    }
  }

  // Ajouter à l'historique
  validationHistory.push(historyEntry)

  return {
    success: isValid,
    message: isValid 
      ? 'Code validé avec succès'
      : 'Code de validation invalide',
    timestamp: new Date().toISOString(),
    location
  }
}

export function getValidationHistory(requestId?: string): ValidationHistory[] {
  if (requestId) {
    return validationHistory.filter(entry => entry.requestId === requestId)
  }
  return validationHistory
}

// Fonction utilitaire pour obtenir la géolocalisation
async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  // Simuler des coordonnées pour la démo
  return {
    latitude: 5.316667 + (Math.random() - 0.5) * 0.1,
    longitude: -4.033333 + (Math.random() - 0.5) * 0.1
  }
} 