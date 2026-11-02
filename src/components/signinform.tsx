'use client'
import { cn } from "cn"

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

import { authClient } from "@/app/lib/auth-client"
import { redirect } from "next/navigation"
import { toast } from "sonner"


export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
 
  
  
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  
      e.preventDefault();
  
  const formData=new FormData(e.currentTarget)
  
  const user=Object.fromEntries(formData.entries()) as {email:string,password:string}
  
  const {data,error}=await authClient.signIn.email({
  ...user
   
  })

  if(data){
toast.success("Successfully signed in")
  redirect('/')

}

if(error){

  console.log(error)
 toast.error(error.message||"sign in failed")
}

  
  
  console.log(formData);
    console.log(user);
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="mx-auto text-2xl">Login to your account</CardTitle>
          <CardDescription className="mx-auto">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button className="hover:bg-black hover:text-white" type="submit">Login</Button>
                <Button className="hover:bg-black hover:text-white"
                 variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
