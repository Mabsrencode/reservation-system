import React from 'react'
import { Link } from "react-router-dom";
import "./logo.css"
import { Typography } from '@material-tailwind/react'
import logo from "../../assets/logo.png";
const Logo = () => {
    return (
        <Typography
            as={Link}
            to="/"
            className="logo"
        >
            <img src={logo} alt="logo" />
        </Typography>
    )
}

export default Logo