import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install with `npm install jwt-decode`

const Header = () => {
  const [user, setUser] = useState<{
    email: string;
    name: string;
    avatar: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          email: decoded.email,
          name: decoded.name || decoded.email.split("@")[0],
          avatar:
            decoded.avatar ||
            "https://media.gettyimages.com/id/175440771/photo/handsome-young-man-gesturing-thumbs-up-isolated.jpg?s=2048x2048&w=gi&k=20&c=E6CiovzcgjUoIthjSXFEbAWiMr1RqqC4GnyWqpMBXhg=",
        });
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, [setUser]); // Ensure it updates when setUser changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <h1 className="text-xl font-semibold">UNet</h1>
        <nav>
          <ul className="flex gap-4 items-center">
            {user ? (
              <>
                <li className="flex items-center gap-2">
                  {user.name}
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-white"
                  />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-200">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <a href="/login" className="hover:text-gray-200">
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
