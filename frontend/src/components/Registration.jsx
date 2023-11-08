import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Registration = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',

  });

  const [isCheckbox, setIsCheckbox] = useState(false);
  const handleCheck = () => {
    setIsCheckbox(!isCheckbox);
  }

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_START' });

    try {
      const res = await axios.post('q-zone-api.onrender.com/auth/register', credentials);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      navigate('/'); //! new update
    } catch (err) {
      dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div>
      <Card className="container my-16 mx-auto" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input type="text" placeholder="Username" id="username" onChange={handleChange} className="registration_input" />
            <Input type="email" placeholder="Email" id="email" onChange={handleChange} className="registration_input" />
            <Input type="tel" placeholder="Phone Number" id="phone_number" onChange={handleChange} className="registration_input" />
            <Input type="password" placeholder="Password" id="password" onChange={handleChange} className="registration_input" />
          </div>
          <Checkbox onClick={handleCheck}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <Link to={"/terms&condition"} className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth disabled={isCheckbox ? loading : true} onClick={handleRegistration}>
            {loading ? "Loading..." : "Register"}
          </Button>
          {error && <span>{error.message}</span>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-gray-900">Sign In</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Registration;
