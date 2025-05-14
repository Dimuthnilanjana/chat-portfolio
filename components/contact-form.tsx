"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function ContactForm() {
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the message to your backend
    console.log("Message submitted:", message)
    alert("Thanks for your message! I'll get back to you soon.")
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">
      <div className="flex-1 relative">
        <Input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          required
          className="bg-gray-800 border-gray-700 rounded-full pl-4 pr-12 py-6"
        />
      </div>
      <Button type="submit" size="icon" className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 flex-shrink-0">
        <Send size={20} />
      </Button>
    </form>
  )
}
