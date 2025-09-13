"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpData } from "@/lib/validations/auth";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch("password", "");

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (response.error) {
        setError(
          response.error.message ||
            "Failed to create account. Please try again."
        );
        return;
      }

      setSuccess(true);

      // Redirect to dashboard after successful sign up
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="space-y-4 text-center" data-cy="success-message">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Account created successfully!
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Welcome to TaskFlow Pro. Redirecting you to the dashboard...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              data-cy="name-input"
              {...register("name")}
              className={
                errors.name ? "border-red-300 focus:border-red-500" : ""
              }
            />
            {errors.name && (
              <p className="text-sm text-red-600" data-cy="name-error">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              // type="email"
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
                placeholder="Create a password"
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

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2" data-cy="password-strength">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        passwordStrength >= level
                          ? passwordStrength <= 2
                            ? "bg-red-400"
                            : passwordStrength <= 3
                            ? "bg-yellow-400"
                            : "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Password strength:{" "}
                  <span
                    className={
                      passwordStrength <= 2
                        ? "text-red-600"
                        : passwordStrength <= 3
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {passwordStrength <= 2
                      ? "Weak"
                      : passwordStrength <= 3
                      ? "Medium"
                      : "Strong"}
                  </span>
                </p>
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-600" data-cy="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                data-cy="confirm-password-input"
                {...register("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "border-red-300 pr-10 focus:border-red-500"
                    : "pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                data-cy="confirm-password-toggle"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                className="text-sm text-red-600"
                data-cy="confirm-password-error"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-cy="signup-button"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  data-cy="loading-spinner"
                />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
