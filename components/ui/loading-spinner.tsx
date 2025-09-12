import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className
      )}
    />
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="space-y-4 text-center">
        <LoadingSpinner size="lg" className="mx-auto text-blue-600" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function FormLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="space-y-2 text-center">
        <LoadingSpinner size="md" className="mx-auto text-blue-600" />
        <p className="text-sm text-gray-600">Processing...</p>
      </div>
    </div>
  );
}
