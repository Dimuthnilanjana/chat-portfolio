"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MessageBubble } from "@/components/message-bubble"
import { useState, useEffect } from "react"
import { TypingIndicator } from "@/components/typing-indicator"
import { DateSeparator } from "@/components/date-separator"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  tools: string[]
  challenge: string
  solution: string
  results: string
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = Number.parseInt(params.id)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const totalMessages = 8

  // Sample project data - in a real app, you'd fetch this based on the ID
  const projects: Record<number, Project> = {
    1: {
      id: 1,
      title: "E-commerce Redesign",
      description: "Complete overhaul of an e-commerce platform focusing on conversion optimization and accessibility.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["UI/UX", "Figma", "React"],
      tools: ["Figma", "React", "Next.js", "Tailwind CSS", "Storybook"],
      challenge:
        "The client's existing e-commerce platform had a high bounce rate and low conversion. Users were finding it difficult to navigate through products and complete the checkout process, especially on mobile devices.",
      solution:
        "I redesigned the user interface with a focus on simplicity and accessibility. The new design features a streamlined product browsing experience, simplified checkout process, and improved product filtering. The mobile experience was completely rebuilt from the ground up.",
      results:
        "After implementing the redesign, the client saw a 35% increase in conversion rate, 28% decrease in cart abandonment, and a 42% increase in mobile sales. The average time spent on the site also increased by 15%.",
    },
    2: {
      id: 2,
      title: "Finance Dashboard",
      description: "Data visualization dashboard for financial analytics with dark mode and responsive design.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Dashboard", "Data Viz", "Next.js"],
      tools: ["Next.js", "D3.js", "TypeScript", "Tailwind CSS", "Recharts"],
      challenge:
        "The client needed a way to visualize complex financial data in an intuitive way. Their existing solution was spreadsheet-based, making it difficult to identify trends and make data-driven decisions quickly.",
      solution:
        "I designed and developed a comprehensive dashboard with customizable widgets, interactive charts, and real-time data visualization. The dashboard includes filtering options, date range selectors, and export functionality. A dark mode was implemented to reduce eye strain during extended use.",
      results:
        "The new dashboard reduced the time spent on financial analysis by 60%. Users reported a significant improvement in decision-making speed and accuracy. The client was able to identify cost-saving opportunities that resulted in a 15% reduction in operational expenses.",
    },
  }

  const project = projects[projectId]

  // Handle scroll events to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

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

  if (!project) {
    return <div className="p-8 text-center">Project not found</div>
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f] border-b border-gray-800 p-4">
        <div className="container max-w-2xl mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Date separator */}
        <DateSeparator />

        {/* Project hero image */}
        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        {/* Chat conversation about the project */}
        <div className="space-y-6">
          {/* Introduction */}
          {isTyping && currentTypingIndex === 1 && <TypingIndicator />}
          {visibleMessages >= 1 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
                <MessageBubble type="designer" animate={true}>
                  <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                  <p>{project.description}</p>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* User question about tools */}
          {visibleMessages >= 2 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>What tools did you use for this project?</p>
              </MessageBubble>
            </div>
          )}

          {/* Tools used */}
          {isTyping && currentTypingIndex === 3 && <TypingIndicator />}
          {visibleMessages >= 3 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
                <MessageBubble type="designer" animate={true}>
                  <h3 className="font-bold mb-2">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-blue-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* User question about challenge */}
          {visibleMessages >= 4 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>What was the main challenge in this project?</p>
              </MessageBubble>
            </div>
          )}

          {/* Challenge */}
          {isTyping && currentTypingIndex === 5 && <TypingIndicator />}
          {visibleMessages >= 5 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
                <MessageBubble type="designer" animate={true}>
                  <h3 className="font-bold mb-2">The Challenge</h3>
                  <p>{project.challenge}</p>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* User question about solution */}
          {visibleMessages >= 6 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>How did you solve it?</p>
              </MessageBubble>
            </div>
          )}

          {/* Solution */}
          {isTyping && currentTypingIndex === 7 && <TypingIndicator />}
          {visibleMessages >= 7 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
                <MessageBubble type="designer" animate={true}>
                  <h3 className="font-bold mb-2">The Solution</h3>
                  <p>{project.solution}</p>
                </MessageBubble>
              </div>
            </div>
          )}

          {/* User question about results */}
          {visibleMessages >= 8 && (
            <div className="flex flex-col items-end mb-6">
              <div className="text-xs text-gray-400 mb-1">You</div>
              <MessageBubble type="user" animate={true}>
                <p>What were the results?</p>
              </MessageBubble>
            </div>
          )}

          {/* Results */}
          {isTyping && currentTypingIndex === 9 && <TypingIndicator />}
          {visibleMessages >= 9 && (
            <div className="flex items-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Thimira Dulakshitha</div>
                <MessageBubble type="designer" animate={true}>
                  <h3 className="font-bold mb-2">The Results</h3>
                  <p>{project.results}</p>
                </MessageBubble>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fixed bottom-20 right-4 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <ChevronUp size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky chat input footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
        <div className="container max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-800 border-gray-700 rounded-full pl-4 pr-12 py-2 text-white"
                disabled
              />
            </div>
            <Button size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 flex-shrink-0" disabled>
              <ChevronUp size={20} />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
