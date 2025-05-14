"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend or email service
    console.log("Form submitted:", formData)
    alert("Thanks for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700"
        />
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700"
        />
      </div>
      <div className="flex-[2] flex gap-2">
        <Textarea
          name="message"
          placeholder="Type your message..."
          value={formData.message}
          onChange={handleChange}
          required
          className="flex-1 bg-gray-800 border-gray-700 min-h-[40px] h-10 resize-none py-2"
        />
        <Button type="submit" size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700">
          <Send size={18} />
        </Button>
      </div>
    </form>
  )
}
