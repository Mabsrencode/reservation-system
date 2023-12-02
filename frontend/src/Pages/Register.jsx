import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
const Register = () => {
    const [isCheckbox, setIsCheckbox] = useState(false);
    const handleCheck = () => {
        setIsCheckbox(!isCheckbox);
    }
    return (
        <section>
            <Card className="container my-16 mx-auto" color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input type="text" placeholder="Username" id="username" className="registration_input" />
                        <Input type="email" placeholder="Email" id="email" className="registration_input" />
                        <Input type="tel" placeholder="Phone Number" id="phone_number" className="registration_input" />
                        <Input type="password" placeholder="Password" id="password" className="registration_input" />
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
                    <Button className="mt-6" fullWidth  >
                        {/* {loading ? "Loading..." : "Register"} */}
                        Register
                    </Button>
                    {/* {error && <span>{error.message}</span>} */}
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to={"/login"} className="font-medium text-gray-900">Sign In</Link>
                    </Typography>
                </form>
            </Card>
        </section>
    )
}

export default Register