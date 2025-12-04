import { Link, useLocation } from "react-router-dom";
import { Heart, PlayCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-50 shadow-sm fixed top-0 right-0 left-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition"
        >
          <PlayCircle className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate\">
            Movie Search
          </h1>
        </Link>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              location.pathname === "/"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              location.pathname === "/favorites"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">Favorites</span>
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-gray-50 shadow-inner border-t">
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>

            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === "/favorites"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
