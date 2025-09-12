import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AuthLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
          <div>
            <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-blue-200" />
        </div>
      </div>

      <div className="text-center">
        <LoadingSpinner size="sm" className="mx-auto text-blue-600" />
      </div>
    </div>
  );
}
