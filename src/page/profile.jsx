import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to load user data from Local Storage
        const loadUserData = () => {
            const userString = localStorage.getItem('user');
            
            if (userString) {
                try {
                    const userData = JSON.parse(userString);
                    setUser(userData);
                } catch (e) {
                    console.error("Error parsing user data from Local Storage:", e);
                    // Handle corrupted data by clearing it and redirecting
                    localStorage.removeItem('user');
                    navigate('/login', { replace: true });
                }
            } else {
                // If 'user' item is missing, redirect to login
                navigate('/', { replace: true });
            }
            setLoading(false);
        };

        loadUserData();
    }, [navigate]); // navigate is a dependency, though stable

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 
        
        // Redirect the user to the login page
        navigate('/', { replace: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-700">Loading user profile...</p>
            </div>
        );
    }

    // Since the loader function already ensures authentication, 'user' should exist here.
    if (!user) {
        return null; // Should be handled by the loader/useEffect redirect, but added for safety
    }

    // Format timestamps for display
    const formattedCreatedAt = new Date(user.createdAt).toLocaleDateString();
    const formattedUpdatedAt = new Date(user.updatedAt).toLocaleDateString();


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6">
                
                <div className="text-center border-b pb-4">
                    <h2 className="text-4xl font-extrabold text-green-700">
                        {user.name || 'User Profile'}
                    </h2>
                    <p className="text-lg text-gray-500 mt-1 capitalize">
                        Role: {user.role.toLowerCase()}
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Email:</span>
                        <span className="text-sm font-semibold text-gray-900">{user.email}</span>
                    </div>

                    {/* User ID */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">User ID:</span>
                        <span className="text-sm font-semibold text-gray-900">{user.id}</span>
                    </div>

                    {/* Active Status */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Account Status:</span>
                        <span className={`text-sm font-bold ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    {/* Created At */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Member Since:</span>
                        <span className="text-sm font-medium text-gray-900">{formattedCreatedAt}</span>
                    </div>

                    {/* Updated At */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                        <span className="text-sm font-medium text-gray-900">{formattedUpdatedAt}</span>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 mt-6 font-semibold rounded-lg shadow-md transition duration-200 
                               bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Profile;