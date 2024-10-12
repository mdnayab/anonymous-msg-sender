'use client'
import { Message } from "@/model/User"
import { useState } from "react"


function page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  return (
    <div>page</div>
  )
}

export default page