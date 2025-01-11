'use client'
import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'

interface DeliveryInfo {
  id: string
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
  status: 'en_attente' | 'en_transit' | 'livré'
  validationCode: string
  carrier: {
    name: string
    transportType: string
    vehicleInfo: string
  }
  payment: {
    amount: number
    status: 'effectué' | 'en_attente' | 'remboursé'
  }
  trackingUrl: string
}

const generateQRCodeData = (deliveryInfo: DeliveryInfo): string => {
  const sensitiveData = {
    senderContact: deliveryInfo.sender.contact,
    recipientContact: deliveryInfo.recipient.contact,
  }

  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(sensitiveData), 
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_key'
  ).toString()

  const qrCodeData = {
    ...deliveryInfo,
    sender: { ...deliveryInfo.sender, contact: '[encrypted]' },
    recipient: { ...deliveryInfo.recipient, contact: '[encrypted]' },
    encryptedData,
  }

  return JSON.stringify(qrCodeData)
}

interface QRCodeGeneratorProps {
  deliveryInfo: DeliveryInfo
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ deliveryInfo }) => {
  const qrCodeData = generateQRCodeData(deliveryInfo)

  return (
    <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow">
      <QRCodeSVG 
        value={qrCodeData} 
        size={256} 
        level="H"
        includeMargin={true}
      />
    </div>
  )
}

export default QRCodeGenerator

