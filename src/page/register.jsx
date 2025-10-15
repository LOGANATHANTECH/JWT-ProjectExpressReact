import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Base API URL — fallback added for safety
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    //  Basic frontend validation
    if (!formData.username.trim()) {
      setError("Username is required.");
      setIsLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Send POST request to backend
      const response = await axios.post(`${BASE_API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration Successful:", response.data);
      setSuccess(true);
      setFormData({ username: "", email: "", password: "" });

      // Redirect after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage =
        err.response?.data?.message ??
        err.message ??
        "An unexpected error occurred during registration.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        {/*  Status Messages */}
        {success && (
          <div className="p-3 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            Registration successful! Redirecting to login...
          </div>
        )}
        {error && (
          <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}

        {/*  Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="register-username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="register-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading || success}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading || success}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="register-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading || success}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || success}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition duration-200 ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            } text-white`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isLoading}
            className="ml-1 font-semibold text-green-600 hover:text-green-800 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
