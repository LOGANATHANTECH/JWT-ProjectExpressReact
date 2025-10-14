import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const LOGIN_API_URL = `${import.meta.env.VITE_BASE_API_URL}/login`;


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!LOGIN_API_URL) {
      setError("Login API URL not configured.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Use axios.post to send the request
      const response = await axios.post(`${LOGIN_API_URL}`, formData);
      
      // Data is accessed via response.data
      const data = response.data;
      console.log('Login Successful, received token/data:', data);
      
      const authToken = data.token; 
      
      if (authToken) {
        // 2. Call the successful login handler with the token and user data
        localStorage.setItem('token', authToken);
        console.log(localStorage.getItem('token'));
        
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile');
      } else {
        throw new Error('Login successful but no authentication token received.');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred during login.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Reusing the centering container setup (Flexbox) for consistency
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        
        {/* Status Message */}
        {error && (
          <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email" id="login-email" name="email" value={formData.email} onChange={handleChange} required
              disabled={isLoading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" id="login-password" name="password" value={formData.password} onChange={handleChange} required
              disabled={isLoading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition duration-200 ${
              isLoading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            } text-white`}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        {/* Switch Link */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account? 
          <button
            type="button"
            onClick={()=>{navigate('/register');}}
            disabled={isLoading}
            className="ml-1 font-semibold text-green-600 hover:text-green-800 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;