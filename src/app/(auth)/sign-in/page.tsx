'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import axios, {AxiosError} from "axios"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/types/ApiResponse"


const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedUsername = useDebounceValue(username, 300)
  const { toast } = useToast()
  const router = useRouter()

  //Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({       //z.infer declare what type of value we get
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const isCheckingUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(AxiosError.response?.data.message ?? "Error checking username")
        }
      }
    }
  }, [debouncedUsername])
  

  return (
    <div>page</div>
  )
}

export default page