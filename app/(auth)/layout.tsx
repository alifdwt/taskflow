import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | TaskFlow Pro Authentication",
    default: "Authentication | TaskFlow Pro",
  },
  description:
    "Sign in to your TaskFlow Pro account to manage your tasks and projects efficiently.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding & Features */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-12 text-white lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex w-full flex-col justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">TaskFlow Pro</span>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h1 className="mb-4 text-4xl leading-tight font-bold">
                Manage Your Tasks
                <br />
                Like a Pro
              </h1>
              <p className="text-lg text-blue-100">
                Streamline your workflow with powerful project management and
                task tracking capabilities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
                  <svg
                    className="h-4 w-4 text-green-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Project-based task organization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
                  <svg
                    className="h-4 w-4 text-green-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Priority levels and due date tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
                  <svg
                    className="h-4 w-4 text-green-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Comprehensive task analytics</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-3 italic">
              &quot;TaskFlow Pro has revolutionized how our QA team manages
              testing workflows. The integration capabilities are
              outstanding!&quot;
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <span className="text-sm font-medium">QA</span>
              </div>
              <div>
                <p className="font-medium">QA Engineering Team</p>
                <p className="text-sm text-blue-200">
                  PT Bionic Teknologi Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-48 translate-y-48 rounded-full bg-white/5" />
      </div>

      {/* Right side - Authentication Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
