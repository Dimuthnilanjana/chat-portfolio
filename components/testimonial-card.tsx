"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div className="bg-gray-900 rounded-lg p-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
        </Avatar>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{testimonial.content}"</p>
    </motion.div>
  )
}
