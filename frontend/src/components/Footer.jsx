import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const date = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        {/* //TODO: LOGO  */}
        <img src="" alt="" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as={Link}
              to="/"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/about"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/pricing"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Pricing
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/booking"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Booking
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/contact"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; {date} CARWASH
      </Typography>
    </footer>
  );
}

export default Footer;