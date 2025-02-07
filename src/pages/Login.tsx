import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );

      console.log("User logged in:", data);
      localStorage.setItem("token", data.token); // Store JWT token

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.error("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
