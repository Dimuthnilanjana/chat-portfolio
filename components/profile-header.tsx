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
      className="sticky top-0 z-20 border-b border-gray-800"
      style={{
        backgroundColor: isScrolled ? "rgba(15,15,15,0.8)" : "#0f0f0f",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        boxShadow: isScrolled ? "0 2px 6px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <motion.div
        layout
        className="container max-w-2xl mx-auto px-4 flex flex-col items-center text-center"
        style={{
          paddingTop: isScrolled ? 8 : 24,
          paddingBottom: isScrolled ? 8 : 24,
          transition: "padding 0.3s ease",
        }}
      >
        {/* Avatar */}
        <motion.div layout className="relative" style={{ marginBottom: isScrolled ? 4 : 12 }}>
          <motion.div
            layout
            style={{
              width: isScrolled ? 48 : 80,
              height: isScrolled ? 48 : 80,
              borderRadius: "9999px",
              overflow: "hidden",
              border: "2px solid #3b82f6",
              transition: "all 0.3s ease",
            }}
          >
            <motion.img
              layout
              src={designer.avatar || "/placeholder.svg"}
              alt={designer.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
          {designer.isOnline && (
            <motion.div
              layout
              style={{
                position: "absolute",
                backgroundColor: "#22c55e",
                border: "2px solid #0f0f0f",
                borderRadius: "9999px",
                width: isScrolled ? 12 : 16,
                height: isScrolled ? 12 : 16,
                bottom: 0,
                right: 0,
                transition: "all 0.3s ease",
              }}
            />
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          layout
          style={{
            fontWeight: 700,
            fontSize: isScrolled ? "1.125rem" : "1.25rem", // text-lg vs text-xl
            color: "#ffffff",
            transition: "font-size 0.3s ease",
          }}
        >
          {designer.name}
        </motion.h1>

        {/* Only show extra info when not scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 1 }}
              style={{ overflow: "hidden" }}
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
