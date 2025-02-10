import { useEffect, useState } from "react";
import { makeRequest } from "../axios";
import Posts from "./Posts";
import AddIcon from "@mui/icons-material/Add";

interface UnionType {
  id: number;
  name: string;
  slug: string;
  desc: string;
  coverPic?: string;
  profilePic?: string;
  createdAt: string;
  owner: {
    id: number;
    username: string;
    name: string;
    profilePic: string;
  };
}

interface UnionViewProps {
  slug: string;
}

type SortOption = "most_liked" | "trending" | "new";
type TimeframeOption =
  | "today"
  | "this_week"
  | "this_month"
  | "this_year"
  | "all_time";

const UnionView: React.FC<UnionViewProps> = ({ slug }) => {
  const [union, setUnion] = useState<UnionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("most_liked");
  const [timeframe, setTimeframe] = useState<TimeframeOption>("today");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchUnion = async () => {
      try {
        const res = await makeRequest.get(`/unions/${slug}`);
        setUnion(res.data);
      } catch (err: Error | unknown) {
        console.error("Full error:", err);
        const error = err as { response?: { data: string } };
        setError(error.response?.data || "Failed to load union");
      } finally {
        setLoading(false);
      }
    };

    fetchUnion();
  }, [slug]);

  const handleCreatePost = async () => {
    try {
      if (!content.trim()) {
        console.error("Content is required");
        return;
      }

      if (!union?.id) {
        return;
      }

      const postData = {
        desc: content.trim(),
        unionId: union.id,
      };

      const response = await makeRequest.post("/posts", postData);

      setContent("");
      setIsCreateOpen(false);
      // Optional: Refresh posts
      window.location.reload();
    } catch (err: any) {
      console.error(
        "Failed to create post:",
        err.response?.data || err.message
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Please log in to create posts");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!union) return <div>Union not found</div>;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <img
            src={union.coverPic || "/default-cover.png"}
            alt={`${union.name} cover`}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={union.profilePic || "/default-avatar.png"}
            alt={union.owner.username}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{union.name}</h1>
            <p className="text-gray-600">Created by {union.owner.username}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6">{union.desc}</p>
      </div>
      <>
        <div className="my-4 flex items-center justify-between">
          <div
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="flex items-center gap-2 border-2 border-blue-600 bg-white hover:bg-blue-50 rounded-full cursor-pointer px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
            <AddIcon className="text-blue-600" />
            <span className="text-blue-600 font-medium">Create Post</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                name="sort"
                id="sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="most_liked">Most Liked</option>
                <option value="trending">Trending</option>
                <option value="new">New</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="timeframe"
                className="text-sm font-medium text-gray-700">
                Time frame:
              </label>
              <select
                name="timeframe"
                id="timeframe"
                value={timeframe}
                onChange={e => setTimeframe(e.target.value as TimeframeOption)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="this_year">This Year</option>
                <option value="all_time">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {isCreateOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Create a Post
            </h2>
            <div className="space-y-4">
              {/* <div>
                <label
                  htmlFor="post-title"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="post-title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Enter your post title"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
              <div>
                <label
                  htmlFor="post-content"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  placeholder="What would you like to share?"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleCreatePost}
                  className="inline-flex items-center gap-2 border-2 border-blue-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
                  <span className="text-blue-600 font-medium">Create Post</span>
                </button>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="inline-flex items-center gap-2 border-2 border-gray-600 bg-white hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md">
                  <span className="text-gray-600 font-medium">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <Posts sortBy={sortBy} timeframe={timeframe} unionId={union.id} />
      </>
    </div>
  );
};

export default UnionView;
