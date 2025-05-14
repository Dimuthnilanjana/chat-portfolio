"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-gray-900 max-w-[90%] mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-blue-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
