import Image from "next/image"

interface CertificationBadgeProps {
  name: string
  imageSrc?: string
}

export default function CertificationBadge({ name, imageSrc }: CertificationBadgeProps) {
  // Use the provided image source or fall back to a placeholder
  const imageSource = imageSrc || "/placeholder.svg?height=96&width=96"

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2">
        <Image src={imageSource || "/placeholder.svg"} alt={name} fill className="object-contain" />
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  )
}

