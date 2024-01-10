import React, { useState } from 'react';
import axios from 'axios';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
    Checkbox,
    CardFooter,
    CardBody,
} from "@material-tailwind/react";
import { useUser } from '../context/userContext';

const SignIn = () => {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [seePassword, setSeePassword] = useState(false)
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
            document.body.style.cursor = "wait";
            const data = await axios.post("https://attractive-pink-shrimp.cyclic.app/api/users/sign-in", user)
            document.body.style.cursor = "default";
            navigate('/')
            setLoading(false)
            setUser(data);
        } catch (error) {
            setLoading(false)
            setError(true)
            setErrorMessage("Invalid Password or Email.")
            document.body.style.cursor = "default";
            console.log(error)
        }
    };
    const handleSeePassword = () => {
        if (!seePassword) {
            setSeePassword(true);
        } else if (seePassword) {
            setSeePassword(false);
        }
    }
    return (
        <section className='h-5/6  my-12 dark:bg-gray-900'>
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                        Sign In
                    </Typography>
                    <Typography
                        className="mb-3 font-normal"
                        variant="paragraph"
                        color="gray"
                    >
                        Enter your email and password to Sign In.
                    </Typography>
                    <Typography className="-mb-2" variant="h6">
                        Your Email
                    </Typography>
                    <Input type="email" placeholder="Email" id="email" onChange={(e) => { setEmail(e.target.value) }} className="registration_input pl-6 " />
                    <Typography className="-mb-2" variant="h6">
                        Your Password
                    </Typography>
                    <div className='relative'>
                        <Input type={seePassword ? "text" : "password"} placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="registration_input pl-6" /> {seePassword ? <FaRegEye onClick={handleSeePassword} className='absolute right-[6px] top-[10px] text-[20px] cursor-pointer' /> : <FaRegEyeSlash onClick={handleSeePassword} className='absolute right-[6px] top-[10px] text-[20px] cursor-pointer' />}
                    </div>
                    <div className="-ml-2.5 -mt-3">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="mt-6" fullWidth disabled={loading} onClick={handleSignIn}>
                        {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                            Loading...</> : "Sign In"}
                    </Button>
                    {error ? (<div className='mt-2 text-red-900'>{errorMessage}</div>) : <></>}
                    <Typography variant="small" className="mt-4 flex justify-center">
                        Don&apos;t have an account?
                        <Link to="/register">
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"

                            >
                                Sign up
                            </Typography>
                        </Link>

                    </Typography>
                </CardFooter>
            </Card>
        </section>
    )
}

export default SignIn