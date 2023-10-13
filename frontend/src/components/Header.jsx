import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
const Header = () => {
  const { user } = useContext(AuthContext);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:text-blue-500 focus:text-blue-500"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:text-blue-500 focus:text-blue-500"
      >
        <Link to="/services" className="flex items-center">
          Services
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:text-blue-500 focus:text-blue-500"
      >
        <Link to="/about" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:text-blue-500 focus:text-blue-500"
      >
        <Link to="/contact" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:text-blue-500 focus:text-blue-500"
      >

        {user ? (<LogoutButton />) : (<Link to="/login" className="flex items-center">
          Login
        </Link>)}
        {/* {!user && (<Link to="/login" className="flex items-center">
          Login
        </Link>)} */}

      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          CARWASH
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block "
        >
          <Link to={user ? "/booking" : "/login"}>
            <span>Book Now</span>
          </Link>

        </Button>

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
              stroke="currentColor"
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
              stroke="currentColor"
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
        <div>{user ? user.username : null} </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Book Now</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default Header;
