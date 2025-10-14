import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (!BASE_API_URL) {
      setError("API URL not configured in environment variables.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Use axios.post to send the request
      const response = await axios.post(`${BASE_API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Axios throws an error for non-2xx status codes, 
      // so successful status codes (like 201) proceed here.
      const newUser = response.data;
      
      console.log('Registration Successful:', newUser);
      setSuccess(true);
      
      setFormData({ username: '', email: '', password: '' }); 

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error('Registration Error:', err);
      // Axios error structure: err.response contains the server response
      // err.response.data.message is typically where the backend error text is stored
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred during registration.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (Your JSX structure remains the same) ...
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        
        {/* Status Messages */}
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields... */}
          {/* Username Input */}
          <div>
            <label htmlFor="register-username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text" id="register-username" name="username" value={formData.username} onChange={handleChange} required
              disabled={isLoading || success}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email" id="register-email" name="email" value={formData.email} onChange={handleChange} required
              disabled={isLoading || success}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" id="register-password" name="password" value={formData.password} onChange={handleChange} required
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
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            } text-white`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Switch Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <button
            type="button"
            onClick={() => navigate('/login')}
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