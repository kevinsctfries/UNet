// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"; // Commented out for likes functionality
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";

// Define types for props
interface PostProps {
  post: {
    id: number;
    userId: number;
    name: string;
    profilePic: string;
    createdAt: string;
    desc: string;
    img?: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "AuthContext is undefined. Ensure AuthContextProvider wraps the component tree."
    );
  }
  const { currentUser } = context;

  // Commented out the query for likes
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["likes", post.id],
  //   queryFn: async () => {
  //     const res = await makeRequest.get(`/likes?postId=${post.id}`);
  //     return res.data;
  //   },
  // });
  // if (error) console.error(error);

  // Commented out the like mutation
  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: async (liked: boolean) => {
  //     if (liked) {
  //       return makeRequest.delete(`/likes?postId=${post.id}`);
  //     }
  //     return makeRequest.post("/likes", { postId: post.id });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["likes"] });
  //   },
  // });

  // const handleLike = () => {
  //   if (!data || !currentUser) return;
  //   mutation.mutate(data.includes(currentUser.id));
  // };

  const handleDelete = () => {
    makeRequest.delete(`/posts/${post.id}`);
  };

  return (
    <div className="post bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="container">
        <div className="user flex items-center justify-between mb-4">
          <div className="userInfo flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={post.profilePic}
              alt="Profile"
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                {post.name}
              </Link>
            </div>
          </div>
          {currentUser && post.userId === currentUser.id && (
            <>
              <DeleteOutlinedIcon
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Delete post?
                  </div>
                  <div className="flex justify-end px-4 py-2 space-x-2">
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="content mb-4">
          <p className="text-gray-700">{post.desc}</p>
          {post.img && (
            <img
              className="mt-4 w-full h-auto rounded-lg shadow-md"
              src={`/upload/${post.img}`}
              alt="Post"
            />
          )}
        </div>

        <div className="info flex space-x-6 text-gray-500">
          {/* Commented out like functionality */}
          {/* <div
            className="item flex items-center cursor-pointer"
            onClick={handleLike}>
            {isLoading ? (
              "Loading"
            ) : data && currentUser && data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon className="text-red-500" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span className="ml-2">{data?.length} Likes</span>
          </div> */}
          <div
            className="item flex items-center cursor-pointer"
            onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span className="ml-2">See Comments</span>
          </div>
          <div className="item flex items-center cursor-pointer">
            <ShareOutlinedIcon />
            <span className="ml-2">Share</span>
          </div>
        </div>
        {/* {commentOpen && <Comments postId={post.id} />} */}
      </div>
    </div>
  );
};

export default Post;
