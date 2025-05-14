"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Calendar, Copy, Check } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export function SocialButtons() {
  const [copied, setCopied] = useState(false)
  const email = "alex@example.com"

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="bg-blue-900/30 border-blue-700 hover:bg-blue-800/50 text-white"
          onClick={() => window.open("https://linkedin.com", "_blank")}
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="bg-purple-900/30 border-purple-700 hover:bg-purple-800/50 text-white"
          onClick={() => window.open("https://calendly.com", "_blank")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book a Call
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="bg-green-900/30 border-green-700 hover:bg-green-800/50 text-white"
          onClick={copyEmail}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              {email}
            </>
          )}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="bg-red-900/30 border-red-700 hover:bg-red-800/50 text-white"
          onClick={() => (window.location.href = `mailto:${email}`)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Me
        </Button>
      </motion.div>
    </div>
  )
}
