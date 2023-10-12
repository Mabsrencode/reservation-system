import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',

  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_START' });

    try {
      const res = await axios.post('/auth/register', credentials);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      navigate('/login');
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className="signUp">
      <div className="registration_container">
        <input type="text" placeholder="Username" id="username" onChange={handleChange} className="registration_input" />
        <input type="email" placeholder="Email" id="email" onChange={handleChange} className="registration_input" />
        <input type="tel" placeholder="Phone Number" id="phone_number" onChange={handleChange} className="registration_input" />
        <input type="password" placeholder="Password" id="password" onChange={handleChange} className="registration_input" />
        {/* Add more input fields for registration data as needed */}
        <button disabled={loading} onClick={handleRegistration} className="registrationButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Registration;
