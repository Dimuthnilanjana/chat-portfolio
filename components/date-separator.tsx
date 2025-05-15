"use client"

import { useEffect, useState } from "react"

export function DateSeparator() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    const now = new Date()

    // Format: "14 WED 15:48 PM"
    const day = now.getDate()
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][now.getDay()]

    let hours = now.getHours()
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'

    const minutes = now.getMinutes().toString().padStart(2, "0")

    const formattedDateTime = `${day} ${weekday} ${hours}:${minutes} ${ampm}`
    setDateTime(formattedDateTime)
  }, [])

  return (
    <div className="flex items-center justify-center py-6 my-6">
      <div className="border-t border-gray-800 flex-grow"></div>
      <div className="px-4 text-gray-500 text-sm">{dateTime}</div>
      <div className="border-t border-gray-800 flex-grow"></div>
    </div>
  )
}
