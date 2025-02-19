import { makeRequest } from "../axios";
import Post from "./Post";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type SortOption = "most liked" | "trending" | "new";
type TimeframeOption = "today" | "week" | "month" | "year" | "all";

interface Post {
  id: number;
  name: string;
  profilePic: string;
  desc: string;
  img: string;
  userId: number;
  createdAt: string;
}

interface PostsProps {
  sortBy: SortOption;
  timeframe: TimeframeOption;
  unionId?: number;
}

const Posts: React.FC<PostsProps> = ({ sortBy, timeframe, unionId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = {
          sortBy,
          timeframe,
          ...(unionId && { unionId }), // Only add unionId to params if it exists
        };
        const res = await makeRequest.get("/posts", { params });
        setPosts(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err as AxiosError);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [sortBy, timeframe, unionId]);

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded">
        Error: {error.message || "Failed to load posts"}
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="space-y-4">
      {posts?.map(post => (
        <Post post={post} key={post.id} />
      ))}
      {!posts?.length && (
        <div className="p-4 text-gray-500">No posts available</div>
      )}
    </div>
  );
};

export default Posts;
