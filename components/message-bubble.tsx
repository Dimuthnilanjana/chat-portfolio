"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  type: "user" | "designer"
  children: React.ReactNode
  avatar?: string
  animate?: boolean
}

export function MessageBubble({ type, children, avatar, animate = false }: MessageBubbleProps) {
  const isDesigner = type === "designer"

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: isDesigner ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={cn("flex items-start gap-3", isDesigner ? "justify-start" : "justify-end")}
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true }}
      variants={bubbleVariants}
    >
      {isDesigner && avatar && (
        <Avatar className="h-10 w-10 mt-1 flex-shrink-0">
          <AvatarImage src={avatar || "/placeholder.svg"} alt="Designer" />
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-md",
          isDesigner ? "bg-gray-800 text-white rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none",
        )}
      >
        {children}
      </div>

      {!isDesigner && (
        <div className="w-10 flex-shrink-0" /> // Spacer to align with avatar
      )}
    </motion.div>
  )
}
