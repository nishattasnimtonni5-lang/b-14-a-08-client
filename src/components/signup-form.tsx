'use client'
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,

} from "@/components/ui/card"

import {

  Field,

  FieldDescription,

  FieldGroup,

  FieldLabel,

} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { cn } from "cn"
import { useState } from "react"

import { toast } from "sonner"

export default function SignUpForm({

  className,

  ...props

}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.success("Account created successfully");
      router.push('/');
    }

    if (error) {
      toast.error(error.message || "sign up failed");
    }

    setLoading(false);
  }
  
  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card>

        <CardHeader>

          <CardTitle className="mx-auto text-2xl">Sign up your account</CardTitle>

          <CardDescription>

            Enter your informations below to sign up your account

          </CardDescription>

        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit}>

            <FieldGroup>

              <Field>

                <FieldLabel htmlFor="name">name</FieldLabel>

                <Input

                  id="name"

                  type="text"

                  name="name"

                  placeholder="Your name"

                  required

                />
</Field>


<Field>

                <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>

                <Input

                  id="image"

                  type="url"

                  name="image"

                  placeholder="Enter Your Profile Image URL"

                  required

                />
</Field>
  <Field>

                <FieldLabel htmlFor="email">email</FieldLabel>
                <Input

                  id="email"

                  type="email"

                  name="email"

                  placeholder="m@example"

                  required

                />

              </Field>

              <Field>

                <div className="flex items-center">

                  <FieldLabel htmlFor="password">Password</FieldLabel>

                </div>

                <Input id="password" type="password" name="password"
                placeholder="Enter at least 8 characters"
                required />

              </Field>

              <Field>

                <Button type="submit" className="hover:bg-black hover:text-white" disabled={loading}>Sign Up</Button>

                <Button variant="outline" className="hover:bg-black hover:text-white" type="button">

                  Sign Up with Google

                </Button>

                <FieldDescription className="text-center">

                  Have an account? <a href="/signin">Sign in</a>

                </FieldDescription>

              </Field>

            </FieldGroup>

          </form>

        </CardContent>

      </Card>

    </div>

  )

}