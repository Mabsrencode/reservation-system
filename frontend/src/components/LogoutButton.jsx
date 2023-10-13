import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            // await axios.post('/auth/logout');
            dispatch({ type: 'LOGOUT' });
            document.cookie = null;

            localStorage.clear();
            navigate('/'); //or login navigate
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
