import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogout = () => {
        try {
            localStorage.clear();
            setUser(null);
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
