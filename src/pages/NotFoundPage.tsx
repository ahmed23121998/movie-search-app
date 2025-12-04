import { AlertCircle} from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <AlertCircle className="w-24 h-24 sm:w-32 sm:h-32 text-red-500 opacity-80" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-2">
            404
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-gray-700">
            Page Not Found
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
          Sorry! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Need help? Try searching for a movie:
          </p>
          <div className="text-xs sm:text-sm text-gray-600 space-y-2">
            <p>🎬 Popular searches: Avatar, Inception, Titanic</p>
          </div>
        </div>
      </div>
    </div>
  );
}
