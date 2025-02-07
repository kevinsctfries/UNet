import { Link, Route } from "react-router-dom";
import Login from "./Login";

const SplashPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="flex w-[800px] border border-white/20 backdrop-blur-md text-center shadow-xl overflow-hidden">
        {/* First Section - White Background */}
        <div className="flex flex-col justify-center w-1/2 px-6 border-r border-white/20 bg-white p-10 rounded-l-xl">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-gray-900">
            UNet
          </h2>
          <p className="text-sm text-gray-700">
            Welcome to UNet, the next evolution in social networking. Connect
            with friends, meet new people, and build your professional
            network—all in one place.
          </p>

          <div className="mt-4 text-gray-700 text-sm space-y-2">
            <p>Share your thoughts with the world.</p>
            <p>Engage in meaningful conversations.</p>
            <p>Post photos, videos, and memories.</p>
            <p>Join events, create groups, and expand your reach.</p>
          </div>
        </div>

        {/* Second Section - Gray Background */}
        <div className="flex flex-col justify-center w-1/2 px-6 bg-gray-100 p-10 rounded-r-xl">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-gray-900">
            UNet
          </h2>
          <p className="text-sm text-gray-700">
            Already have an account? Log in to access your network, share
            updates, and stay connected.
          </p>

          <div className="mt-4 text-gray-700 text-sm space-y-2">
            <p>Reconnect with your friends.</p>
            <p>Stay up to date with trending discussions.</p>
            <p>Manage your groups and events.</p>
            <p>Continue where you left off.</p>
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <Link to="/login" className="w-full">
              <button className="bg-blue-600 text-white py-2 px-4 font-semibold hover:bg-blue-700 transition w-full">
                Login
              </button>
            </Link>

            <button className="bg-cyan-600 text-white py-2 px-4 font-semibold hover:bg-cyan-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
