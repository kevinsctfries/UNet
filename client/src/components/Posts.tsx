import { makeRequest } from "../axios";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { AxiosError } from "axios";

interface Post {
  id: number;
  name: string;
  profilePic: string;
  desc: string;
  img: string;
  userId: number;
  createdAt: string;
}

const Posts: React.FC = () => {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery<Post[], AxiosError>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await makeRequest.get("/posts");
      return response.data;
    },
    staleTime: 60000, // Cache data for 1 minute
    retry: 2, // Retry failed requests twice
  });

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
