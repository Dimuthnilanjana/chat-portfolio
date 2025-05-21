"use client"

import { useEffect, useState, useRef } from "react"
import { MessageBubble } from "@/components/message-bubble"
import { ContactForm } from "@/components/contact-form"
import { SocialButtons } from "@/components/social-buttons"
import { ProfileHeader } from "@/components/profile-header"
import { DateSeparator } from "@/components/date-separator"
import { TypingIndicator } from "@/components/typing-indicator"
import { useRouter } from "next/navigation"

export default function Home() {
  const totalMessages = 11 // Increased for about me and testimonials
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Sample data
  const designer = {
    name: "Dimuth Nilanjana",
    title: (
      <>
        UI/UX Engineer{" "}
        <a href="https://www.epictechnology.lk/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-700">
          @Epic Lanka
        </a>
      </>
    ),
    
    pronouns: "He/Him",
    // tagline: "Make it Iconic. 🔍",
    location: "Colombo, Sri Lanka",
    email: "dimuth.work@gmail.com",
    // personality: "ENFJ",
    avatar: "/img.jpeg?height=250&width=250",
    isOnline: true,
  }

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      description: "Complete overhaul of an e-commerce platform focusing on conversion optimization and accessibility.",
      image: "/placeholder.svg?height=208&width=308",
      tags: ["UI/UX", "Figma", "React"],
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "Data visualization dashboard for financial analytics with dark mode and responsive design.",
      image: "/placeholder.svg?height=208&width=308",
      tags: ["Dashboard", "Data Viz", "Next.js"],
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with Dimuth was incredible. They delivered beyond our expectations and were a joy to collaborate with.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder at StartupX",
      content: "Dimuth has an eye for detail that transformed our product. Highly recommended for any design project.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Calculate header height for proper spacing
  useEffect(() => {
    // Function to calculate expanded header height
    const calculateHeaderHeight = () => {
      // Expanded header is approximately 200px, collapsed is about 80px
      const expandedHeight = isScrolled ? 80 : 200
      setHeaderHeight(expandedHeight)
    }

    calculateHeaderHeight()

    // Recalculate when scroll state changes
    window.addEventListener("resize", calculateHeaderHeight)
    return () => window.removeEventListener("resize", calculateHeaderHeight)
  }, [isScrolled])

  // Handle scroll events to detect when page is scrolled with throttling
  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current)
      }

      // Set a timeout to update the state
      scrollThrottleRef.current = setTimeout(() => {
        if (window.scrollY > 50) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }, 10) // Small delay to throttle updates
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current)
      }
    }
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

      {/* Content with proper spacing from header */}
      <div style={{ paddingTop: `${headerHeight + 20}px` }}>
        <div className="container max-w-2xl mx-auto px-4 pb-32">
          {/* Date separator - explicitly visible with more space */}
          <DateSeparator />

          {/* Chat messages */}
          <div className="space-y-6 mt-8">
            {/* Introduction */}
            {isTyping && currentTypingIndex === 1 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
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
                    <p>Hey! It's me, Dimuth, a UX Engineer based in Colombo. How can I help you today? 😊</p>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* User question about About Me */}
            {visibleMessages >= 2 && (
              <div className="flex flex-col items-end mb-6">
                <div className="text-xs text-gray-400 mb-1">You</div>
                <MessageBubble type="user" animate={true}>
                  <p>Tell me about yourself</p>
                </MessageBubble>
              </div>
            )}

            {/* About Me */}
            {isTyping && currentTypingIndex === 3 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
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
                    <div className="w-full">
                      <div className="image-container">
                        <img
                          src={designer.avatar || "/placeholder.svg"}
                          alt={designer.name}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <h2 className="text-xl font-bold mb-2">About Me</h2>
                      <p className="text-gray-300">
                        I'm a passionate product designer focused on creating meaningful digital experiences. With over
                        5 years of experience, I specialize in user-centered design that solves real problems.
                      </p>
                    </div>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* User question about work */}
            {visibleMessages >= 4 && (
              <div className="flex flex-col items-end mb-6">
                <div className="text-xs text-gray-400 mb-1">You</div>
                <MessageBubble type="user" animate={true}>
                  <p>Can I see your work?</p>
                </MessageBubble>
              </div>
            )}

            {/* Designer philosophy */}
            {isTyping && currentTypingIndex === 5 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
            {visibleMessages >= 5 && (
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
                      Of course! Have you ever wondered why some products capture attention while others do not? It is
                      not just about quality but about creating a genuine connection. I work on designing digital
                      products and brands that make a lasting impression and truly stand out.
                    </p>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* Project 1 */}
            {isTyping && currentTypingIndex === 7 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
            {visibleMessages >= 6 && (
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
                    <h2 className="text-lg font-bold mb-2">Here's some recent work</h2>
                    <div className="mt-2 -mx-4 -mb-4" onClick={() => handleProjectClick(projects[0].id)}>
                      <div className="overflow-hidden bg-gray-900 cursor-pointer">
                        <div className="relative w-full h-[208px]">
                          <img
                            src={projects[0].image || "/placeholder.svg"}
                            alt={projects[0].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-bold mb-1">{projects[0].title}</h3>
                          <p className="text-sm text-gray-300 mb-2">{projects[0].description}</p>
                          <div className="flex flex-wrap gap-1">
                            {projects[0].tags.map((tag, index) => (
                              <span key={index} className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-blue-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* Project 2 */}
            {isTyping && currentTypingIndex === 9 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
            {visibleMessages >= 7 && (
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
                    <div onClick={() => handleProjectClick(projects[1].id)} className="-mx-4 -mb-4">
                      <div className="overflow-hidden bg-gray-900 cursor-pointer">
                        <div className="relative w-full h-[208px]">
                          <img
                            src={projects[1].image || "/placeholder.svg"}
                            alt={projects[1].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-bold mb-1">{projects[1].title}</h3>
                          <p className="text-sm text-gray-300 mb-2">{projects[1].description}</p>
                          <div className="flex flex-wrap gap-1">
                            {projects[1].tags.map((tag, index) => (
                              <span key={index} className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-blue-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* User question about clients */}
            {visibleMessages >= 8 && (
              <div className="flex flex-col items-end mb-6">
                <div className="text-xs text-gray-400 mb-1">You</div>
                <MessageBubble type="user" animate={true}>
                  <p>What do your clients say about you?</p>
                </MessageBubble>
              </div>
            )}

            {/* Testimonial 1 */}
            {isTyping && currentTypingIndex === 11 && (
              <TypingIndicator name={testimonials[0].name} avatar={testimonials[0].avatar} />
            )}
            {visibleMessages >= 9 && (
              <div className="flex items-start gap-2 mb-6">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                  <img
                    src={testimonials[0].avatar || "/placeholder.svg"}
                    alt={testimonials[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    {testimonials[0].name} • {testimonials[0].role}
                  </div>
                  <MessageBubble type="designer" animate={true}>
                    <p className="italic">"{testimonials[0].content}"</p>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* Testimonial 2 */}
            {isTyping && currentTypingIndex === 13 && (
              <TypingIndicator name={testimonials[1].name} avatar={testimonials[1].avatar} />
            )}
            {visibleMessages >= 10 && (
              <div className="flex items-start gap-2 mb-6">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                  <img
                    src={testimonials[1].avatar || "/placeholder.svg"}
                    alt={testimonials[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    {testimonials[1].name} • {testimonials[1].role}
                  </div>
                  <MessageBubble type="designer" animate={true}>
                    <p className="italic">"{testimonials[1].content}"</p>
                  </MessageBubble>
                </div>
              </div>
            )}

            {/* User question about contact */}
            {visibleMessages >= 11 && (
              <div className="flex flex-col items-end mb-6">
                <div className="text-xs text-gray-400 mb-1">You</div>
                <MessageBubble type="user" animate={true}>
                  <p>How can I get in touch with you?</p>
                </MessageBubble>
              </div>
            )}

            {/* Contact info */}
            {isTyping && currentTypingIndex === 15 && <TypingIndicator name={designer.name} avatar={designer.avatar} />}
            {visibleMessages >= 12 && (
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
      </div>

      {/* Sticky chat input footer */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
        <ContactForm />
      </div> */}
    </main>
  )
}
