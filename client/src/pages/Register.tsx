import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  name: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<RegisterInputs>({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null); // Clear error when user types
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErr(error.response?.data?.message || "Registration failed");
      } else {
        setErr("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      inputs.username.length >= 3 &&
      inputs.email.includes("@") &&
      inputs.password.length >= 6 &&
      inputs.name.length >= 2
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-96 transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
              minLength={3}
              autoComplete="username"
              autoFocus
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-describedby={err ? "register-error" : undefined}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required
              minLength={2}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {err && (
            <div
              id="register-error"
              role="alert"
              className="text-red-600 text-sm m-2 text-center">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors
              disabled:bg-blue-300 disabled:cursor-not-allowed">
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
