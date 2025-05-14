"use client"
import { motion, AnimatePresence } from "framer-motion"

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
    <motion.div
      layout
      className={`sticky top-0 z-20 transition-all duration-300 ${
        isScrolled
          ? "py-2 backdrop-blur-md bg-[#0f0f0f]/80 shadow-md"
          : "py-6 bg-[#0f0f0f]"
      }`}
    >
      <motion.div
        layout
        className="container max-w-2xl mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Avatar Section */}
        <motion.div
          layout
          className={`relative ${isScrolled ? "mb-1" : "mb-3"}`}
        >
          <motion.div
            layout
            className={`rounded-full overflow-hidden border-2 border-blue-500 ${
              isScrolled ? "w-12 h-12" : "w-20 h-20"
            }`}
          >
            <img
              src={designer.avatar || "/placeholder.svg"}
              alt={designer.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {designer.isOnline && (
            <motion.div
              layout
              className={`absolute border-2 border-[#0f0f0f] bg-green-500 rounded-full ${
                isScrolled ? "bottom-0 right-0 w-3 h-3" : "bottom-1 right-1 w-4 h-4"
              }`}
            />
          )}
        </motion.div>

        {/* Text Section */}
        <motion.h1
          layout
          className={`font-bold transition-all duration-300 ${
            isScrolled ? "text-lg" : "text-xl"
          }`}
        >
          {designer.name}
        </motion.h1>

        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 text-sm mt-2 mb-2">{designer.pronouns}</p>
              <p className="text-white mb-1">{designer.title}</p>
              <p className="text-gray-300 mb-3">{designer.tagline}</p>
              <p className="text-gray-400 text-sm">
                {designer.personality} · {designer.location} · {designer.email}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
