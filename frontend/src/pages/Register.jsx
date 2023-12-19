import React, { useState } from 'react'; //useContext
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/setup"
import phFlag from "../assets/philippines.png";
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
const Register = () => {
    const [user, setUser] = useState(null)
    const [otp, setOtp] = useState("")
    const [firstName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState("")
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [verified, setVerified] = useState();
    const [errorVerifying, setErrorVerifying] = useState(false);
    const [isCheckbox, setIsCheckbox] = useState(false);
    const handleCheck = () => {
        setIsCheckbox(!isCheckbox);
    }
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const sendOtp = async () => {
        try {
            setSending(true);
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, tel, recaptcha)
            setUser(confirmation)
            setSendSuccess("Verification Code has been sent successfully.")
            setSending(false)

        } catch (error) {
            setSendSuccess("Too many request. Please try again.");
            console.log(error);
            setSending(false)
            setErrorVerifying(true);
        }

    }
    //verifying
    const verifyOtp = async () => {
        try {
            setSendSuccess("")
            setVerifyingOtp(true);
            const data = await user.confirm(otp)
            console.log(data)
            setSendSuccess("Verified.")
            setVerifyingOtp(false)
            setVerified(true)
        } catch (error) {
            console.log(error);
            setSendSuccess("Invalid Verification Code");
            setVerifyingOtp(false)
            setVerified(false)
            setErrorVerifying(true);
        }
    }
    //registration
    const handleRegistration = async (e) => {
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`;

        if (firstName === "" || lastName === "" || email === "" || tel === "" || password === "" || cpassword === "") {
            setError(true);
            setErrorMessage("Please fill all the fields.");
        } else if (password !== cpassword) {
            setError(true);
            setErrorMessage("Password does not match.");
            // eslint-disable-next-line
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError(true);
            setErrorMessage("Invalid Email.");
        } else if (isNaN(Number(tel))) {
            setError(true);
            setErrorMessage("Mobile Number must be numeric only.");
        } else if (password.length < 8) {
            setError(true);
            setErrorMessage("Minimum password must be at least 8 characters.");
        } else if (password.length > 24) {
            setError(true);
            setErrorMessage("Maximum password must be at least 24 characters.");
        } else if (!verified) {
            setError(true);
            setErrorMessage("Invalid Verification Code.");
        } else {
            setError(false);

            const user = {
                name: fullName,
                email,
                tel,
                password,
                cpassword,
            };

            try {
                setLoading(true);
                const data = await axios.post("/api/users/register", user);
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/sign-in');
            } catch (error) {
                setErrorMessage("Something went wrong with the server. Please try again.");
                setError(true);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };


    return (

        <section className='my-12 dark:bg-gray-900'>
            <Card className="container p-4  bg-white my-16 mx-auto w-full  max-w-[26rem] " color="transparent" shadow={false}>
                <Typography variant="h4" color="black">
                    Sign Up
                </Typography>
                <Typography className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <label htmlFor="first-name">First Name</label>
                            <Input type="text" placeholder="First Name" id="first-name" onChange={(e) => { setFistName(e.target.value) }} className="registration_input capitalize pl-6" required />
                        </div>
                        <div>
                            <label htmlFor="last-name">Last Name</label>
                            <Input type="text" placeholder="Last Name" id="last-name" onChange={(e) => { setLastName(e.target.value) }} className="registration_input capitalize pl-6" required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input type="email" placeholder="Email" id="email" onChange={(e) => { setEmail(e.target.value) }} className="registration_input pl-6" required />
                        </div>
                        <div>
                            <label htmlFor="phone_number">Mobile Number</label>

                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'><img className='w-[30px]' src={phFlag} alt="ph" /> <h1>+63</h1></div><Input type="tel" placeholder="920*******" id="phone_number" onChange={(e) => { setTel("+63" + e.target.value) }} className="registration_input pl-6 " maxLength={10} required />
                            </div>
                            <div className='mt-2 flex items-center gap-2' >
                                <Input type='text' placeholder="Verification Code" id='otp' onChange={(e) => { setOtp(e.target.value) }} /><Button onClick={sendOtp} disabled={sending} className=' w-1/2'>{sending ? "Sending..." : "Send OTP"}</Button>
                            </div>
                            <Button className='mt-2' onClick={verifyOtp} disabled={verifyingOtp}>{verifyingOtp ? "Verifying..." : "Verify Otp"}</Button>
                            {<h1 className={`mt-2 ${errorVerifying ? "text-red-900" : "text-green-500"}`} >{sendSuccess}</h1>}
                        </div>
                        <div id="recaptcha"></div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Input type="password" placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }} className="registration_input pl-6" required />
                        </div>
                        <div>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <Input type="password" placeholder="Confirm Password" id="cpassword" onChange={(e) => { setCpassword(e.target.value) }} className="registration_input pl-6" required />
                        </div>
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
                        {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                            Loading...</> : "Register"}
                    </Button>
                    {error ? <div className='text-red-900 font-normal mt-2'>{errorMessage}</div> : <></>}
                    <Link to={"/sign-in"}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold mt-2"

                        >
                            Already have an account?{" "}   Sign In
                        </Typography>
                    </Link>

                </form>
            </Card>
        </section>

    )
}

export default Register