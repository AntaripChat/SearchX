import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Animated logo/brand section */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SearchX
          </h1>
          <Sparkles className="w-8 h-8 text-purple-500" />
        </div>
        <p className="text-gray-500 text-lg">Discover anything with AI-powered search</p>
      </div>

      {/* Search container with enhanced styling */}
      <div className="w-full max-w-2xl">
        <div
          className={`flex items-center w-full bg-white rounded-2xl shadow-lg transition-all duration-300 ${
            isFocused 
              ? "shadow-2xl scale-105 ring-4 ring-blue-200" 
              : "hover:shadow-xl"
          }`}
        >
          {/* Search icon */}
          <div className="pl-5">
            <Search className="w-5 h-5 text-gray-400" />
          </div>

          {/* Input field */}
          <input
            className="flex-1 px-4 py-4 outline-none bg-transparent text-gray-700 placeholder-gray-400"
            placeholder="Search for news, images, videos, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search button with micro-interactions */}
          <button
            onClick={handleSearch}
            disabled={!query.trim()}
            className={`px-8 py-4 rounded-r-2xl font-medium transition-all duration-300 ${
              query.trim()
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>

        {/* Search suggestions/popular searches */}
        {isFocused && !query && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow-lg animate-slide-down">
            <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {["Artificial Intelligence", "Web Development", "React Tutorials", "Design Systems"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    onSearch(suggestion);
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feature badges */}
      <div className="flex gap-4 mt-8 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          Fast search
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
          AI-powered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Privacy focused
        </span>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;