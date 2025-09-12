import type { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your TaskFlow Pro account",
};

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Get started</h1>
        <p className="text-gray-600">
          Create your TaskFlow Pro account to start managing tasks
        </p>
      </div>

      {/* Sign Up Form */}
      <SignUpForm />

      {/* Footer Links */}
      <div className="text-center text-sm">
        <div className="flex items-center justify-center space-x-1">
          <span className="text-gray-600">Already have an account?</span>
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Terms */}
      <div className="text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
