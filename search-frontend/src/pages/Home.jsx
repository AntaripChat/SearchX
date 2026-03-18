import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { searchDocuments } from "../api/searchApi";
import { 
  Loader2, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown,
  X,
  TrendingUp,
  Clock,
  Bookmark,
  Sparkles
} from "lucide-react";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTime, setSearchTime] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: "relevance", // relevance, date, popularity
    category: "all",
    timeRange: "any"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const resultsRef = useRef(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setCurrentQuery(query);
    setLoading(true);
    setError(null);
    
    const startTime = Date.now();
    
    try {
      const data = await searchDocuments(query);
      setResults(data);
      setSearchTime(Date.now() - startTime);
      
      // Add to recent searches
      setSavedSearches(prev => {
        const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
        return newSearches;
      });
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setCurrentQuery("");
    setSearchTime(null);
  };

  const applyFilters = (results) => {
    let filteredResults = [...results];
    
    // Apply sorting
    if (filters.sortBy === "date") {
      filteredResults.sort((a, b) => new Date(b.data?.date) - new Date(a.data?.date));
    } else if (filters.sortBy === "popularity") {
      filteredResults.sort((a, b) => (b.data?.popularity || 0) - (a.data?.popularity || 0));
    }
    // Default relevance sorting - assuming API returns relevant order
    
    // Apply category filter
    if (filters.category !== "all") {
      filteredResults = filteredResults.filter(r => r.data?.category === filters.category);
    }
    
    return filteredResults;
  };

  const filteredResults = applyFilters(results);
  const categories = [...new Set(results.map(r => r.data?.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header with floating effect */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SearchX
            </h1>
            {currentQuery && (
              <span className="hidden md:flex items-center gap-1 text-sm text-gray-500">
                <span>Searching for:</span>
                <span className="font-medium text-gray-700">"{currentQuery}"</span>
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              {filters.category !== "all" && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
            
            {results.length > 0 && (
              <button
                onClick={clearSearch}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
        </div>

        {/* Recent searches */}
        {savedSearches.length > 0 && !results.length && !loading && (
          <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {savedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter panel */}
        {showFilters && results.length > 0 && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Results
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Sort by</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Most Recent</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500 mb-1">Time range</label>
                <select
                  value={filters.timeRange}
                  onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="any">Any time</option>
                  <option value="day">Past 24 hours</option>
                  <option value="week">Past week</option>
                  <option value="month">Past month</option>
                  <option value="year">Past year</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results section */}
        <div ref={resultsRef} className="space-y-6">
          {/* Results header */}
          {results.length > 0 && !loading && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Found {filteredResults.length} results
                </span>
                {searchTime && (
                  <span>({searchTime}ms)</span>
                )}
              </div>
              
              {filteredResults.length !== results.length && (
                <span className="text-blue-600">
                  Filtered from {results.length} results
                </span>
              )}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500">Searching...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 mb-2">{error}</p>
              <button
                onClick={() => handleSearch(currentQuery)}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Results grid */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <div
                  key={result.id || index}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <ResultCard result={result} />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && results.length === 0 && currentQuery && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try different keywords or check your spelling
              </p>
            </div>
          )}

          {/* Initial state */}
          {!loading && !error && results.length === 0 && !currentQuery && (
            <div className="text-center py-20">
              <div className="flex justify-center gap-4 mb-8">
                <TrendingUp className="w-12 h-12 text-blue-400" />
                <Bookmark className="w-12 h-12 text-purple-400" />
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-3">
                Discover amazing content
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter a search query above to start exploring thousands of documents, articles, and resources.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
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
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;