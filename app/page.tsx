"use client"

import { useEffect, useState } from "react"
import { MessageBubble } from "@/components/message-bubble"
import { ContactForm } from "@/components/contact-form"
import { SocialButtons } from "@/components/social-buttons"
import { ProjectCard } from "@/components/project-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { ProfileHeader } from "@/components/profile-header"
import { DateSeparator } from "@/components/date-separator"
import { TypingIndicator } from "@/components/typing-indicator"
import { useRouter } from "next/navigation"

export default function Home() {
  const totalMessages = 8
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Sample data
  const designer = {
    name: "Thimira Dulakshitha",
    title: "CX / Product Designer at @IntrepidTravel",
    pronouns: "He/Him",
    tagline: "Crafting moments that matter. 🔍",
    location: "Colombo, Sri Lanka",
    email: "hello@thimira.me",
    personality: "ENFJ",
    avatar: "/placeholder.svg?height=100&width=100",
    isOnline: true,
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
        "Working with Thimira was incredible. They delivered beyond our expectations and were a joy to collaborate with.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder at StartupX",
      content: "Thimira has an eye for detail that transformed our product. Highly recommended for any design project.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Handle scroll events to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sequential message loading with typing indicator
  useEffect(() => {
    // Start with typing indicator for the first message
    if (visibleMessages === 0) {
      setIsTyping(true)
      setCurrentTypingIndex(1)

      // Show first message after typing delay
      const typingTimer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(1)
      }, 800)

      return () => clearTimeout(typingTimer)
    }

    // For subsequent messages
    if (visibleMessages < totalMessages) {
      const nextMessageIndex = visibleMessages + 1

      // Delay before showing typing indicator
      const delayBeforeTyping = setTimeout(() => {
        // Only show typing indicator for designer messages (odd indices)
        if (nextMessageIndex % 2 !== 0) {
          setIsTyping(true)
          setCurrentTypingIndex(nextMessageIndex)
        }

        // Delay before showing the actual message
        const typingDuration = nextMessageIndex % 2 !== 0 ? 800 : 500
        const messageTimer = setTimeout(() => {
          setIsTyping(false)
          setVisibleMessages(nextMessageIndex)
        }, typingDuration)

        return () => clearTimeout(messageTimer)
      }, 600)

      return () => clearTimeout(delayBeforeTyping)
    }
  }, [visibleMessages, totalMessages])

  // Reset messages on reload
  useEffect(() => {
    // Reset to start the animation sequence
    setVisibleMessages(0)

    // Optional: Save progress in localStorage to prevent full reset on navigation
    return () => {
      localStorage.setItem("chatProgress", visibleMessages.toString())
    }
  }, [])

  // Handle project click
  const handleProjectClick = (projectId: number) => {
    router.push(`/project/${projectId}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
      {/* Profile Header with glass effect when scrolled */}
      <ProfileHeader designer={designer} isScrolled={isScrolled} />

      <div className="container max-w-2xl mx-auto px-4 pb-32 pt-6">
        {/* Chat messages */}
        <div className="space-y-6">
          {/* Date separator */}
          <DateSeparator />

          {/* Introduction */}
          {isTyping && currentTypingIndex === 1 && <TypingIndicator />}
          {visibleMessages >= 1 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src={designer.avatar || "/placeholder.svg"}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">{designer.name}</div>
                <MessageBubble type="designer" animate={true}>
                  <p>Hey! It's me, Thimira, a product designer based in Colombo. How can I help you today? 😊</p>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* User question */}
          {visibleMessages >= 2 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>Can I see your work?</p>
              </MessageBubble>
            </div>
          )}

          {/* Designer philosophy */}
          {isTyping && currentTypingIndex === 3 && <TypingIndicator />}
          {visibleMessages >= 3 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src={designer.avatar || "/placeholder.svg"}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">{designer.name}</div>
                <MessageBubble type="designer" animate={true}>
                  <p>
                    Of course! Have you ever wondered why some products capture attention while others do not? It is not
                    just about quality but about creating a genuine connection. I work on designing digital products and
                    brands that make a lasting impression and truly stand out.
                  </p>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* Projects */}
          {isTyping && currentTypingIndex === 5 && <TypingIndicator />}
          {visibleMessages >= 4 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src={designer.avatar || "/placeholder.svg"}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="text-xs text-gray-400 mb-1">{designer.name}</div>
                <MessageBubble type="designer" animate={true}>
                  <h2 className="text-lg font-bold mb-2">Here's some recent work</h2>
                </MessageBubble>
                <div className="mt-3 space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} onClick={() => handleProjectClick(project.id)} className="cursor-pointer">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User question about clients */}
          {visibleMessages >= 5 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>What do your clients say about you?</p>
              </MessageBubble>
            </div>
          )}

          {/* Testimonials */}
          {isTyping && currentTypingIndex === 7 && <TypingIndicator />}
          {visibleMessages >= 6 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src={designer.avatar || "/placeholder.svg"}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="text-xs text-gray-400 mb-1">{designer.name}</div>
                <MessageBubble type="designer" animate={true}>
                  <h2 className="text-lg font-bold mb-2">Here's what people I've worked with have to say:</h2>
                </MessageBubble>
                <div className="mt-3 space-y-4">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User question about contact */}
          {visibleMessages >= 7 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>How can I get in touch with you?</p>
              </MessageBubble>
            </div>
          )}

          {/* Contact info */}
          {isTyping && currentTypingIndex === 8 && <TypingIndicator />}
          {visibleMessages >= 8 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src={designer.avatar || "/placeholder.svg"}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">{designer.name}</div>
                <MessageBubble type="designer" animate={true}>
                  <h2 className="text-lg font-bold mb-2">Let's connect!</h2>
                  <p className="mb-4">You can reach me through any of these channels:</p>
                  <SocialButtons />
                </MessageBubble>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky chat input footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
        <ContactForm />
      </div>
    </main>
  )
}
