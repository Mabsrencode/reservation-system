import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useUser } from '../context/userContext';

const SignIn = () => {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleSignIn = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }
        try {
            setLoading(true)
            const data = await axios.post("/api/users/sign-in", user)
            navigate('/')
            setLoading(false)
            setUser(data);
        } catch (error) {
            setLoading(false)
            setError(true)
            setErrorMessage("Invalid Password or Email.")
            console.log(error)
        }
    };
    return (
        <Card className="container my-16 max-w-md mx-auto" color="transparent" shadow={false}>
            <Typography variant="h4" color="white">
                Sign In
            </Typography>
            <Typography className="mt-1 font-normal">
                Enter your details to Sign In.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">

                    <Input type="email" placeholder="Email" id="email" onChange={(e) => { setEmail(e.target.value) }} className="registration_input pl-6" />

                    <Input type="password" placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="registration_input pl-6" />

                </div>
                <Button className="mt-6" fullWidth disabled={loading} onClick={handleSignIn}>
                    {loading ? "Loading..." : "Sign In"}
                </Button>
                {error ? (<div className='mt-2 text-red-900'>{errorMessage}</div>) : <></>}
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="font-medium text-white">Register</Link>
                </Typography>
            </form>
        </Card>
    )
}

export default SignIn