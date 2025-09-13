"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInData } from "@/lib/validations/auth";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setError(
          response.error.message || "Failed to sign in. Please try again."
        );
        return;
      }

      // Get return URL from search params or default to dashboard
      const searchParams = new URLSearchParams(window.location.search);
      const returnUrl = searchParams.get("returnUrl") || "/dashboard";

      // Redirect to intended destination
      router.push(returnUrl);
      router.refresh(); // Refresh to update server components
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">TaskFlow Pro</span>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div
              className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              data-cy="error-message"
            >
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              data-cy="email-input"
              {...register("email")}
              className={
                errors.email ? "border-red-300 focus:border-red-500" : ""
              }
            />
            {errors.email && (
              <p className="text-sm text-red-600" data-cy="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                data-cy="password-input"
                {...register("password")}
                className={
                  errors.password
                    ? "border-red-300 pr-10 focus:border-red-500"
                    : "pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                data-cy="password-toggle"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600" data-cy="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-cy="signin-button"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  data-cy="loading-spinner"
                />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
