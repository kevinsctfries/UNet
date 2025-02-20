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
  sortBy?: SortOption;
  timeframe?: TimeframeOption;
  unionSlug?: string;
  postId?: string;
  singlePost?: boolean;
}

const Posts: React.FC<PostsProps> = ({
  sortBy,
  timeframe,
  unionSlug,
  postId,
  singlePost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        let endpoint = "/posts";
        let params = {};

        if (singlePost && postId) {
          const response = await makeRequest.get(`/posts/${postId}`);
          setPosts([response.data]); // Wrap single post in array
        } else {
          // Add unionSlug to params if it exists
          if (unionSlug) {
            params = { ...params, unionSlug };
          }
          const response = await makeRequest.get(endpoint, { params });
          setPosts(response.data);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err as AxiosError);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [postId, singlePost, unionSlug]); // Add unionSlug to dependencies

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
