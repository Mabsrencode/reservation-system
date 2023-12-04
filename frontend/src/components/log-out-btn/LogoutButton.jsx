import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();  // Import setUser from useUser hook

    const handleLogout = () => {
        try {
            // Clear user data in localStorage
            localStorage.clear();

            // Update the user context state to null
            setUser(null);

            // Navigate to the sign-in page
            navigate('/sign-in');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Log out</button>
    );
}

export default LogoutButton;
