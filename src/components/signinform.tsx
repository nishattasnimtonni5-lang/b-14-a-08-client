'use client'
import { cn } from "cn"
import { useState } from "react"

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

import { authClient, signInWithGoogle } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { refetch: refetchSession } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (error) {
      toast.error(error.message || "sign in failed");
      setLoading(false);
      return;
    }

    if (data) {
      await refetchSession();
      toast.success("Successfully signed in");

      const next = new URLSearchParams(window.location.search).get("next");
      const target =
        next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

      router.push(target);
      return;
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);

    const next = new URLSearchParams(window.location.search).get("next");
    const callbackURL =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

    try {
      const { error } = await signInWithGoogle(callbackURL);

      if (error) {
        toast.error(error.message || "Google sign-in failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google sign-in failed"
      );
      setLoading(false);
    }
  };

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
                <Button
                  className="hover:bg-black hover:text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  className="hover:bg-black hover:text-white"
                  variant="outline"
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleSignIn}
                >
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
