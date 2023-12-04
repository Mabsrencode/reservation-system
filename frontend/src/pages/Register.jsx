import React, { useState } from 'react'; //useContext
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const [isCheckbox, setIsCheckbox] = useState(false);
    const handleCheck = () => {
        setIsCheckbox(!isCheckbox);
    }
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password === cpassword) {
            const user = {
                name,
                email,
                tel,
                password,
                cpassword
            }
            try {
                setLoading(true)
                const data = await axios.post("/api/users/register", user)
                localStorage.setItem("user", JSON.stringify(data))
                navigate('/');
                setLoading(false)
                console.log(user)
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log(error)
            }
        } else {

            console.log(error)
        }
    };
    return (

        <Card className="container my-16 max-w-md mx-auto" color="transparent" shadow={false}>
            <Typography variant="h4" color="white">
                Sign Up
            </Typography>
            <Typography className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input type="text" placeholder="Full Name" id="full-name" onChange={(e) => { setName(e.target.value) }} className="registration_input capitalize pl-6" required />
                    <Input type="email" placeholder="Email" id="email" onChange={(e) => { setEmail(e.target.value) }} className="registration_input pl-6" required />
                    <Input type="tel" placeholder="Phone Number" id="phone_number" onChange={(e) => { setTel(e.target.value) }} className="registration_input pl-6" required />
                    <Input type="password" placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="registration_input pl-6" required />
                    <Input type="password" placeholder="Confirm Password" id="cpassword" onChange={(e) => { setCpassword(e.target.value) }} className="registration_input pl-6" required />
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
                    <Link to={"/sign-in"} className="font-medium  text-white">Sign In</Link>
                </Typography>
            </form>
        </Card>

    )
}

export default Register