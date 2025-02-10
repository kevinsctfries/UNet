import { useContext, useState, FormEvent } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

interface LoginInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [inputs, setInputs] = useState<LoginInputs>({
    username: "",
    password: "",
  });

  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Login must be used within an AuthContext.Provider");
  }

  const { login } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-96 transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              onChange={handleChange}
              autoComplete="username"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              autoComplete="current-password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Login Button */}
          <div>
            {err && (
              <div className="text-red-600 text-sm m-2 text-center">{err}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Login
            </button>
          </div>
        </form>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
