"use client"

interface Designer {
  name: string
  title: string
  pronouns: string
  tagline: string
  location: string
  email: string
  personality: string
  avatar: string
  isOnline: boolean
}

interface ProfileHeaderProps {
  designer: Designer
}

export function ProfileHeader({ designer }: ProfileHeaderProps) {
  return (
    <div className="py-6 flex flex-col items-center text-center border-b border-gray-800 mb-6">
      {/* Avatar with online indicator */}
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
          <img src={designer.avatar || "/placeholder.svg"} alt={designer.name} className="w-full h-full object-cover" />
        </div>
        {designer.isOnline && (
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0f0f0f]"></div>
        )}
      </div>

      {/* Name and pronouns */}
      <h1 className="text-xl font-bold">{designer.name}</h1>
      <p className="text-gray-400 text-sm mb-2">{designer.pronouns}</p>

      {/* Title */}
      <p className="text-white mb-1">{designer.title}</p>

      {/* Tagline */}
      <p className="text-gray-300 mb-3">{designer.tagline}</p>

      {/* Details */}
      <p className="text-gray-400 text-sm">
        {designer.personality} · {designer.location} · {designer.email}
      </p>
    </div>
  )
}
