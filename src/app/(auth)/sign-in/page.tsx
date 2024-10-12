"use client";
import dbConnect from "@/lib/dbConnect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      Identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.Identifier,
      password: data.Identifier
    })

    if (result?.error) {
      if (result.error == 'CredentialsSignin') {
        toast({
          title: "Login failed",
          description: "Incorrect username or password",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    }

    if (result?.url) {
      router.replace('/dashboard')
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Anonymous Message Sender
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="Identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input {...field}
                    placeholder="Enter your email or username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Don't have account?{" "}
            <Link
              href={"/sign-up"}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
