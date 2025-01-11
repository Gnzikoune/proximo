import { AES, enc } from 'crypto-js'

// Clé de cryptage (à stocker dans les variables d'environnement en production)
const ENCRYPTION_KEY = 'proximo-delivery-secure-key-2024'

export function encryptData(data: string): string {
  try {
    return AES.encrypt(data, ENCRYPTION_KEY).toString()
  } catch (error) {
    console.error('Erreur lors du cryptage:', error)
    return data
  }
}

export function decryptData(encryptedData: string): string {
  try {
    const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY)
    return bytes.toString(enc.Utf8)
  } catch (error) {
    console.error('Erreur lors du décryptage:', error)
    return encryptedData
  }
} 