import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Consider adding a toast notification here
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white shadow-lg z-50">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold hover:text-gray-200">
          UNet
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            {currentUser ? (
              <>
                <li>
                  <span className="font-medium">
                    {currentUser.name || currentUser.username}
                  </span>
                </li>
                <li>
                  <img
                    src={currentUser.profilePic || "/default-avatar.png"}
                    alt={`${
                      currentUser.name || currentUser.username
                    }'s profile`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
