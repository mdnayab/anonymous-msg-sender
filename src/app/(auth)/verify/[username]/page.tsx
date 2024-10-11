'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function VerifyAccount () {

    const router = useRouter()
    const params = useParams<{username: string}>()
    const {toast} = useToast()

    //Zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    //z.infer declare what type of value we get
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
        const response = await axios.post(`/api/verify-code`, {
            username: params.username,
            code: data.code
        })

        toast({
            title: "Success",
            description: response.data.message
        })
        router.replace('sign-in')
    } catch (error) {
        console.error("Error in verification of user's email", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification failed",
        description: AxiosError.response?.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-md space-y-8'>
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Verify Your Account</h1>
                <p className='mb-4'>Enter the verification code sent to your email</p>
            </div>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter the code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
    </div>
  )
}
