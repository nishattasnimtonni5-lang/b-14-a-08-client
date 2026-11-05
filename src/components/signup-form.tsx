
"use client";

import { authClient, signInWithGoogle } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    const { password } = user;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    setPasswordError("");
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (data) {
        toast.success("Account created successfully");
        router.push("/");
      }

      if (error) {
        toast.error(error.message || "sign up failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { error } = await signInWithGoogle("/");

      if (error) {
        toast.error(error.message || "Google sign-up failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google sign-up failed"
      );
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="mx-auto text-2xl">
            Sign up your account
          </CardTitle>
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

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter at least 6 characters"
                  required
                  onChange={() => setPasswordError("")}
                />

                {passwordError && (
                  <p className="text-sm text-red-500">
                    {passwordError}
                  </p>
                )}

                <FieldDescription>
                  Must contain an uppercase letter, a lowercase letter and at
                  least 6 characters.
                </FieldDescription>
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="hover:bg-black hover:text-white"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>

                <Button
                  variant="outline"
                  className="hover:bg-black hover:text-white"
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleSignUp}
                >
                  {loading ? "Redirecting..." : "Sign Up with Google"}
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
  );
}
