import React from 'react'
import "./footer.css"
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUser } from '../../context/userContext';
import Logo from '../logo/Logo';
const date = new Date().getFullYear();
const Footer = () => {
    const { user } = useUser()
    return (
        <footer className="w-full p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">

                <Logo />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    {!user?.data?.isAdmin && <>
                        <li>
                            <Typography
                                as={Link}
                                to="/"
                                variant="small"

                                className="p-1 font-normal"
                            >
                                Home
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as={Link}
                                to="/services"
                                variant="small"

                                className="p-1 font-normal"
                            >
                                Services
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as={Link}
                                to="/about"
                                variant="small"

                                className="p-1 font-normal"
                            >
                                About Us
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as={Link}
                                to="/contact"
                                variant="small"

                                className="p-1 font-normal"
                            >
                                Contact Us
                            </Typography>
                        </li>
                    </>}
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography variant="small"
                className="text-center font-normal">
                &copy; {date} Q-ZONE
            </Typography>
        </footer>
    )
}

export default Footer