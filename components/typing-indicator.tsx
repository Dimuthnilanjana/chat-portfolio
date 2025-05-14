"use client"

import { motion } from "framer-motion"

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
        <img src="/placeholder.svg?height=100&width=100" alt="Designer" className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
        <div className="bg-gray-800 text-white rounded-2xl rounded-tl-none p-3 inline-flex items-center">
          <motion.div
            className="flex space-x-1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 0.5,
            }}
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
