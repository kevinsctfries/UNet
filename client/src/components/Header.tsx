import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Header = () => {
  const { currentUser } = useContext(AuthContext) || {};

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 text-white shadow-lg">
      <div className="flex h-full items-center justify-between px-4 w-full">
        <h1 className="text-xl font-semibold">UNet</h1>
        <nav className="ml-auto">
          <ul className="flex gap-4 items-center">
            {currentUser ? (
              <>
                <li>
                  <span>{currentUser.name}</span>
                </li>
                <li>
                  <img
                    src={currentUser.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                </li>
                <li>
                  <button className="hover:text-gray-200">Logout</button>
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
