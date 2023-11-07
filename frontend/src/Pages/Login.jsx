import axios from 'axios'
import { useState } from 'react'
// import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../components/hooks/useAuth';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })

  const { loading, error, dispatch } = useAuth();  //!authContext
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }
  // console.log(user)
  return (
    <div className='signIn'>
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
            <Input type="password" placeholder="Password" id="password" onChange={handleChange} className="registration_input" />
          </div>
          <Button className="mt-6" fullWidth disabled={loading} onClick={handleClick}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
          {error && <span>{error.message}</span>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to={"/register"} className="font-medium text-gray-900">Register</Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Login
