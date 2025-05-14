"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  type: "user" | "designer"
  children: React.ReactNode
  animate?: boolean
}

export function MessageBubble({ type, children, animate = false }: MessageBubbleProps) {
  const isDesigner = type === "designer"

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      x: isDesigner ? -10 : 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={cn(
        "rounded-2xl p-4 shadow-md max-w-[85%]",
        isDesigner ? "bg-gray-800 text-white rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none",
      )}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      {children}
    </motion.div>
  )
}
