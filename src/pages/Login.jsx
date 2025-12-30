import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://demo-dental-backend.onrender.com/api/auth/login",
        { password },
        { withCredentials: true }
      );
      toast.success(response.data.message,{duration:700})
      navigate("/all-patients");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-white to-black rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🦷</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dental Clinic
          </h1>
          <p className="text-gray-600">Patient Management System</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Admin Login
          </h2>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-linear-to-r from-white to-black text-white font-semibold rounded-lg hover:from-black hover:to-white focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all transform hover:-translate-y-0.5"
          >
            Login
          </button>
          {/* Submit Button */}
        </form>
      </div>
    </div>
  );
}
export default Login;
