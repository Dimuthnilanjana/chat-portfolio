"use client"

import { useEffect, useRef, useState } from "react"
import { MessageBubble } from "@/components/message-bubble"
import { ContactForm } from "@/components/contact-form"
import { SocialButtons } from "@/components/social-buttons"
import { ProjectCard } from "@/components/project-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const [visibleMessages, setVisibleMessages] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const totalMessages = 8

  // Sample data
  const designer = {
    name: "Alex Morgan",
    title: "UI/UX Designer & Developer",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      description: "Complete overhaul of an e-commerce platform focusing on conversion optimization and accessibility.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["UI/UX", "Figma", "React"],
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "Data visualization dashboard for financial analytics with dark mode and responsive design.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Dashboard", "Data Viz", "Next.js"],
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with Alex was incredible. They delivered beyond our expectations and were a joy to collaborate with.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder at StartupX",
      content: "Alex has an eye for detail that transformed our product. Highly recommended for any design project.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Intersection observer to reveal messages as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleMessages < totalMessages) {
            setTimeout(() => {
              setVisibleMessages((prev) => Math.min(prev + 1, totalMessages))
            }, 300)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (messagesEndRef.current) {
      observer.observe(messagesEndRef.current)
    }

    return () => {
      if (messagesEndRef.current) {
        observer.unobserve(messagesEndRef.current)
      }
    }
  }, [visibleMessages])

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [visibleMessages])

  // Load saved scroll position
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("portfolioScrollPosition")
    const savedVisibleMessages = localStorage.getItem("portfolioVisibleMessages")

    if (savedVisibleMessages) {
      setVisibleMessages(Number.parseInt(savedVisibleMessages))
    }

    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number.parseInt(savedScrollPosition))
      }, 100)
    }

    // Save scroll position and visible messages when leaving
    const handleBeforeUnload = () => {
      localStorage.setItem("portfolioScrollPosition", window.scrollY.toString())
      localStorage.setItem("portfolioVisibleMessages", visibleMessages.toString())
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [visibleMessages])

  return (
    <main className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
      <div className="container max-w-3xl mx-auto px-4 py-8 pb-32">
        {/* Chat header */}
        <div className="sticky top-0 z-10 bg-[#0f0f0f] border-b border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-blue-500">
              <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{designer.name}</h1>
              <p className="text-gray-400 text-sm">{designer.title}</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-6">
          {/* Introduction */}
          {visibleMessages >= 1 && (
            <MessageBubble type="designer" avatar={designer.avatar} animate={true}>
              <h2 className="text-xl font-bold mb-2">Hey there! 👋</h2>
              <p>
                I'm {designer.name}, a {designer.title} passionate about creating beautiful, functional digital
                experiences.
              </p>
            </MessageBubble>
          )}

          {/* User question */}
          {visibleMessages >= 2 && (
            <MessageBubble type="user" animate={true}>
              <p>Can I see your work?</p>
            </MessageBubble>
          )}

          {/* Projects */}
          {visibleMessages >= 3 && (
            <MessageBubble type="designer" avatar={designer.avatar} animate={true}>
              <h2 className="text-xl font-bold mb-4">Here are some of my recent projects:</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </MessageBubble>
          )}

          {/* User question about clients */}
          {visibleMessages >= 4 && (
            <MessageBubble type="user" animate={true}>
              <p>What do your clients say about you?</p>
            </MessageBubble>
          )}

          {/* Testimonials */}
          {visibleMessages >= 5 && (
            <MessageBubble type="designer" avatar={designer.avatar} animate={true}>
              <h2 className="text-xl font-bold mb-4">Here's what people I've worked with have to say:</h2>
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </MessageBubble>
          )}

          {/* User question about contact */}
          {visibleMessages >= 6 && (
            <MessageBubble type="user" animate={true}>
              <p>How can I get in touch with you?</p>
            </MessageBubble>
          )}

          {/* Contact info */}
          {visibleMessages >= 7 && (
            <MessageBubble type="designer" avatar={designer.avatar} animate={true}>
              <h2 className="text-xl font-bold mb-2">Let's connect!</h2>
              <p className="mb-4">You can reach me through any of these channels:</p>
              <SocialButtons />
            </MessageBubble>
          )}

          {/* End of messages marker */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Sticky contact form footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
        <ContactForm />
      </div>
    </main>
  )
}
