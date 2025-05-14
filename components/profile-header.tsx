"use client"

import { motion } from "framer-motion"

interface Designer {
  name: string
  title: string
  pronouns: string
  tagline: string
  location: string
  email: string
  personality: string
  avatar: string
  isOnline: boolean
}

interface ProfileHeaderProps {
  designer: Designer
  isScrolled: boolean
}

export function ProfileHeader({ designer, isScrolled }: ProfileHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "py-2 backdrop-blur-md bg-[#0f0f0f]/80 border-b border-gray-800/70 shadow-md"
          : "py-6 bg-[#0f0f0f] border-b border-gray-800"
      }`}
    >
      <div className="container max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center text-center transition-all duration-300">
          {/* Avatar with online indicator */}
          <div className={`relative ${isScrolled ? "mb-1" : "mb-3"}`}>
            <motion.div
              className={`rounded-full overflow-hidden border-2 border-blue-500 transition-all duration-300 ${
                isScrolled ? "w-12 h-12" : "w-20 h-20"
              }`}
              layout
            >
              <img
                src={designer.avatar || "/placeholder.svg"}
                alt={designer.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {designer.isOnline && (
              <div
                className={`absolute border-2 border-[#0f0f0f] bg-green-500 rounded-full transition-all duration-300 ${
                  isScrolled ? "bottom-0 right-0 w-3 h-3" : "bottom-1 right-1 w-4 h-4"
                }`}
              ></div>
            )}
          </div>

          <div>
            {/* Name and pronouns */}
            <motion.h1 layout className={`font-bold transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}>
              {designer.name}
            </motion.h1>

            {!isScrolled && (
              <>
                <p className="text-gray-400 text-sm mb-2">{designer.pronouns}</p>

                {/* Title */}
                <p className="text-white mb-1">{designer.title}</p>

                {/* Tagline */}
                <p className="text-gray-300 mb-3">{designer.tagline}</p>

                {/* Details */}
                <p className="text-gray-400 text-sm">
                  {designer.personality} · {designer.location} · {designer.email}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
