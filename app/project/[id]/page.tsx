"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  content?: string
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = Number.parseInt(params.id)

  // Sample project data - in a real app, you'd fetch this based on the ID
  const projects: Record<number, Project> = {
    1: {
      id: 1,
      title: "E-commerce Redesign",
      description: "Complete overhaul of an e-commerce platform focusing on conversion optimization and accessibility.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["UI/UX", "Figma", "React"],
      content: `
        This project involved redesigning an e-commerce platform to improve user experience and increase conversion rates.
        
        The key challenges included:
        - Simplifying the checkout process
        - Improving product discovery
        - Enhancing mobile responsiveness
        - Implementing accessibility best practices
        
        The solution focused on a clean, minimalist design with intuitive navigation and clear call-to-action elements.
        User testing showed a 35% improvement in task completion rates and a 22% increase in conversion.
      `,
    },
    2: {
      id: 2,
      title: "Finance Dashboard",
      description: "Data visualization dashboard for financial analytics with dark mode and responsive design.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Dashboard", "Data Viz", "Next.js"],
      content: `
        This finance dashboard project was designed to help users visualize complex financial data in an intuitive way.
        
        The key features included:
        - Real-time data visualization
        - Customizable widgets and reports
        - Dark/light mode toggle
        - Responsive design for all devices
        - Export functionality for reports
        
        The dashboard was built using Next.js and D3.js for visualizations, with a focus on performance and usability.
      `,
    },
  }

  const project = projects[projectId]

  if (!project) {
    return <div className="p-8 text-center">Project not found</div>
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f] border-b border-gray-800 p-4">
        <div className="container max-w-3xl mx-auto flex items-center">
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

      <div className="container max-w-3xl mx-auto px-4 py-6">
        {/* Project hero image */}
        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        {/* Project details */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project content */}
        <div className="prose prose-invert max-w-none">
          {project.content?.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}
