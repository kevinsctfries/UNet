import { useNavigate } from "react-router-dom";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
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
    union?: {
      slug: string;
      name: string;
    };
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext is undefined. Ensure AuthContextProvider wraps the component tree."
    );
  }
  const { currentUser } = context;

  const handleDelete = () => {
    makeRequest.delete(`/posts/${post.id}`);
  };

  const handleCommentClick = () => {
    const path = post.union
      ? `/u/${post.union.slug}/${post.id}`
      : `/post/${post.id}`;
    navigate(path);
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
            <div className="flex align-center gap-4">
              <Link
                to={`/profile/${post.userId}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                {post.name}
              </Link>
              {post.union ? (
                <Link
                  to={`/u/${post.union.slug}`}
                  className="text-sm text-gray-500 hover:text-blue-500">
                  u/{post.union.name}
                </Link>
              ) : (
                // Add this for debugging
                <span className="text-sm text-gray-400">No union data</span>
              )}
            </div>
          </div>
          {currentUser && post.userId === currentUser.id && (
            <>
              {!menuOpen ? (
                <DeleteOutlinedIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setMenuOpen(true)}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDelete}
                    className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors">
                    Delete
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    Cancel
                  </button>
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
              src={post.img}
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
            onClick={handleCommentClick}>
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
