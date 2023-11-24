import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

const BookingDetails = (user) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        bookingDate: '',
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        dispatch({ type: 'BOOKING_START' });

        try {
            const res = await axios.post('/bookings', formData); // Assuming this is the correct endpoint
            dispatch({ type: 'BOOKING_SUCCESS', payload: res.data });
            navigate('/')
            // Redirect or show a success message, as needed
        } catch (err) {
            dispatch({ type: 'BOOKING_FAILURE', payload: err.response.data });
        }
    };

    return (
        <div>
            <Card className="container my-16 mx-auto" color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Book a Service
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your booking details.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input type="text" placeholder="Full Name" id="fullName" onChange={handleChange} className="booking_input" />
                        <Input type="email" placeholder="Email" id="email" onChange={handleChange} className="booking_input" />
                        <Input type="tel" placeholder="Phone Number" id="phoneNumber" onChange={handleChange} className="booking_input" />
                        <Input type="date" placeholder="Booking Date" id="bookingDate" onChange={handleChange} className="booking_input" />
                    </div>
                    <Button className="mt-6" fullWidth disabled={loading} onClick={handleBooking}>
                        {loading ? "Booking..." : "Book Now"}
                    </Button>
                    {error && <span>{error.message}</span>}
                </form>
            </Card>
        </div>
    );
};

export default BookingDetails;
