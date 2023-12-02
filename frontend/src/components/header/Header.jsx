import React from "react";
import { Link } from "react-router-dom";
import './header.css'
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import Logo from "../logo/Logo";

const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="nav-list mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/" className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/services" className="flex items-center">
                    Services
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/about" className="flex items-center">
                    About Us
                </Link>
            </Typography>
            {/* <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/pricing" className="flex items-center">
                    Pricing
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/booking" className="flex items-center">
                    Booking
                </Link>
            </Typography> */}
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal hover:text-orange-500 focus:text-orange-500"
            >
                <Link to="/contact" className="flex items-center">
                    Contact Us
                </Link>
            </Typography>

        </ul>
    );
    return (
        <Navbar className="navbar mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Logo />
                <div className="hidden lg:block">{navList}</div>
                <div className="sign-in-up">
                    {/* <Typography variant="small"
                        color="white"
                        className="lg:inline-block p-1 font-normal hover:text-orange-500  mr-2 focus:text-orange-500">
                        <Link className="ml-4" to="/register">

                            Register

                        </Link>
                    </Typography> */}
                    <Link to="/sign-in">
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block "
                        >
                            <span>Sign In </span>
                        </Button>
                    </Link>
                </div>

                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
                {/* <div>{user ? user.username : null} </div> */}
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    <Link to="/login">
                        <Button variant="gradient" size="sm" fullWidth className="mb-2">

                            <span>Sign In </span>

                        </Button>
                    </Link>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default Header