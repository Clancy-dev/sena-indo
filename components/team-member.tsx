import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMemberProps {
  name: string
  title: string
  email: string 
  phone: string
}

export default function TeamMember({ name, title, email, phone }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-md">
        <Image src="/green user.png?height=160&width=160" alt={name} fill className="object-cover" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-600 mb-2">{title}</p>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <Mail className="h-4 w-4 mr-1" />
        <span>{email}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Phone className="h-4 w-4 mr-1" />
        <span>{phone}</span>
      </div>
      <Button variant="outline" className="rounded-full px-6">
        Contact
      </Button>
    </div>
  )
}

