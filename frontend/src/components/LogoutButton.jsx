import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { dispatch, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            // await axios.post('/auth/logout');
            dispatch({ type: 'LOGOUT' });
            document.cookie = null;

            localStorage.clear();
            navigate('/login'); //or login navigate
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button disabled={loading} onClick={handleLogout}>Log out</button>
    );
}

export default LogoutButton;
