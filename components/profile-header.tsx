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
      layout="position"
      className={`sticky top-0 z-20 ${
        isScrolled
          ? "backdrop-blur-md bg-[#0f0f0f]/80 shadow-md"
          : "bg-[#0f0f0f]"
      }`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        layout
        className={`container max-w-2xl mx-auto px-4 flex flex-col items-center text-center ${
          isScrolled ? "py-2" : "py-6"
        }`}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Avatar */}
        <motion.div
          layout
          className="relative"
          transition={{ duration: 0.3 }}
          style={{ marginBottom: isScrolled ? 4 : 12 }}
        >
          <motion.div
            layout
            className="rounded-full overflow-hidden border-2 border-blue-500"
            style={{
              width: isScrolled ? 48 : 80,
              height: isScrolled ? 48 : 80,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              layout
              src={designer.avatar || "/placeholder.svg"}
              alt={designer.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {designer.isOnline && (
            <motion.div
              layout
              className="absolute border-2 border-[#0f0f0f] bg-green-500 rounded-full"
              style={{
                width: isScrolled ? 12 : 16,
                height: isScrolled ? 12 : 16,
                bottom: isScrolled ? 0 : 4,
                right: isScrolled ? 0 : 4,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          layout
          className="font-bold"
          style={{
            fontSize: isScrolled ? "1.125rem" : "1.25rem",
          }}
          transition={{ duration: 0.3 }}
        >
          {designer.name}
        </motion.h1>

        {/* Extra Details (on scroll up) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
