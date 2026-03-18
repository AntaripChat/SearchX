import { useState } from "react";
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Calendar,
  User,
  Tag,
  Award
} from "lucide-react";

const ResultCard = ({ result }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock additional data - replace with actual data from your result prop
  const {
    title = result.data?.title || "Untitled",
    content = result.data?.content || "",
    author = result.data?.author || "Unknown Author",
    date = result.data?.date || "Recent",
    category = result.data?.category || "General",
    tags = result.data?.tags || ["Information", "Reference"],
    image = result.data?.imageUrl,
    readTime = result.data?.readTime || "3 min read"
  } = result.data || {};

  const score = result.score || 0;
  const relevancePercentage = Math.round(score * 100);

  // Truncate content for preview
  const previewContent = content.length > 200 
    ? content.substring(0, 200) + "..."
    : content;

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      {/* Save badge */}
      <button
        onClick={() => setIsSaved(!isSaved)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 z-10"
        aria-label={isSaved ? "Remove from saved" : "Save result"}
      >
        <Star
          className={`w-4 h-4 transition-colors ${
            isSaved ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
          }`}
        />
      </button>

      <div className="p-6">
        {/* Header section with title and relevance score */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
          
          {/* Relevance score chip */}
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              {relevancePercentage}%
            </span>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">
          {author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
          )}
          
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          )}
          
          {category && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{category}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full">
            <span>{readTime}</span>
          </div>
        </div>

        {/* Image preview if available */}
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content section with expand/collapse */}
        <div className="mb-4">
          <p className="text-gray-600 leading-relaxed">
            {isExpanded ? content : previewContent}
          </p>
          
          {content.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read more <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>

        {/* Tags section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              View Details
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              Share
            </button>
          </div>
          
          {/* Score indicator */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${relevancePercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              Relevance
            </span>
          </div>
        </div>
      </div>

      {/* Hover gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 pointer-events-none transition-all duration-500" />
    </div>
  );
};

// Add PropTypes or TypeScript interface for better type safety
ResultCard.defaultProps = {
  result: {
    data: {},
    score: 0
  }
};

export default ResultCard;