import { useEffect, useState, useRef, useContext } from "react";
import { makeRequest } from "../axios";
import { AxiosError } from "axios";
import Posts from "./Posts";
import AddIcon from "@mui/icons-material/Add";
import CreatePost from "./CreatePost";
import { AuthContext } from "../context/authContext";
import { useCloudinary } from "../hooks/useCloudinary";

// Add AuthContext type
interface LoginInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  currentUser: {
    id: number;
    username: string;
    // ... other user properties
  } | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => Promise<void>;
}

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
  const { currentUser } = useContext(
    AuthContext as React.Context<AuthContextType>
  );
  const [union, setUnion] = useState<UnionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("most_liked");
  const [timeframe, setTimeframe] = useState<TimeframeOption>("today");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingImages, setIsEditingImages] = useState(false);
  const { uploadImage, uploading } = useCloudinary();

  const isOwner = union?.owner.id === currentUser?.id;

  useEffect(() => {
    const fetchUnion = async () => {
      try {
        const res = await makeRequest.get(`/unions/${slug}`);
        setUnion(res.data);
      } catch (err) {
        console.error("Full error:", err);
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as string) || "Failed to load union"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUnion();
  }, [slug]);

  const handleCreatePost = async (content: string) => {
    try {
      if (!content.trim()) {
        return;
      }

      if (!union?.id) {
        return;
      }

      const postData = {
        desc: content.trim(),
        unionId: union.id,
      };

      await makeRequest.post("/posts", postData);
      setIsCreateOpen(false);
      window.location.reload();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 403
      ) {
        alert("Please log in to create posts");
      }
    }
  };

  const handleImageUpload = async (type: "cover" | "profile", file: File) => {
    try {
      const imageUrl = await uploadImage(file);

      if (!imageUrl || !union?.id) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      // Update the endpoint to match the backend route
      await makeRequest.put(`/unions/${union.id}/image`, {
        type,
        imageUrl,
      });

      // Refresh union data
      const res = await makeRequest.get(`/unions/${slug}`);
      setUnion(res.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Image upload error:", err);
      alert(axiosError.response?.data || "Failed to update image");
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
          <div className="relative">
            <img
              src={union.profilePic || "/default-avatar.png"}
              alt={union.owner.username}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {union.name}
                </h1>
                <p className="text-gray-600">
                  Created by {union.owner.username}
                </p>
              </div>
              {isOwner && (
                <button
                  onClick={() => setIsEditingImages(!isEditingImages)}
                  className="px-4 py-2 text-sm border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  {isEditingImages ? "Done Editing" : "Edit Images"}
                </button>
              )}
            </div>
          </div>
        </div>

        {isOwner && isEditingImages && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit Union Images
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={union.coverPic || "/default-cover.png"}
                    alt="Current cover"
                    className="w-32 h-20 object-cover rounded"
                  />
                  <input
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    accept="image/*"
                    title="Upload cover image"
                    aria-label="Upload cover image"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload("cover", file);
                    }}
                  />
                  <button
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    {uploading ? "Uploading..." : "Choose New Cover"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={union.profilePic || "/default-avatar.png"}
                    alt="Current profile"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <input
                    type="file"
                    ref={profileInputRef}
                    className="hidden"
                    accept="image/*"
                    title="Upload image"
                    aria-label="Upload image"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload("profile", file);
                    }}
                  />
                  <button
                    onClick={() => profileInputRef.current?.click()}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Choose New Profile Picture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
          <CreatePost
            onSubmit={handleCreatePost}
            onCancel={() => setIsCreateOpen(false)}
          />
        )}

        <Posts sortBy={sortBy} timeframe={timeframe} unionId={union.id} />
      </>
    </div>
  );
};

export default UnionView;
