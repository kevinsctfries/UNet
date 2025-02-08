import { makeRequest } from "../axios";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";

interface Post {
  id: number;
  name: string;
  profilePic: string;
  desc: string;
  img: string;
  userId: number;
  createdAt: string;
}

const Posts = () => {
  const { isLoading, error, data } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await makeRequest.get("/posts");
      return res.data;
    },
  });

  console.log(data);

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data?.map(post => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
