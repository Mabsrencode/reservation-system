import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext);
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
      <div className="login_container">
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="login_input" />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="login_input" />
        <button disabled={loading} onClick={handleClick} className="loginButton">Sign In</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login
