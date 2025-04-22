"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>


const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res);

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/admin/");
      } else {
        toast.error(res?.error || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='w-xl'>
            <CardHeader>
              <CardTitle className='text-2xl'>AttendEase - Login</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Email</Label>
                    <FormControl>
                      <Input id="password" type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button type='submit'>
                {isLoading ?
                  <Loader2 className='w-4 h-4 animate-spin' />
                  :
                  <>
                    <LogIn />
                    Login
                  </>
                }
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>

  )
}

export default LoginPage