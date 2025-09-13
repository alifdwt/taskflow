import type { Metadata } from "next";
import Link from "next/link";

import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your TaskFlow Pro account",
};

export default function SignInPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600">
          Sign in to your TaskFlow Pro account to continue
        </p>
      </div>

      {/* Sign In Form */}
      <SignInForm />

      {/* Footer Links */}
      <div className="space-y-4 text-center text-sm">
        <div>
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            data-cy="forgot-password-link"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-1">
          <span className="text-gray-600">Don&apos;t have an account?</span>
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            data-cy="signup-link"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 text-sm font-medium text-blue-800">
          Demo Credentials
        </h3>
        <div className="space-y-1 text-xs text-blue-700">
          <p>
            <strong>Email:</strong> test@example.com
          </p>
          <p>
            <strong>Password:</strong> Test123!
          </p>
        </div>
      </div>
    </div>
  );
}
