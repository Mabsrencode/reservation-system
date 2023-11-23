
import React, { useState } from 'react';
import axios from 'axios';

const CancelBooking = () => {
    const [reservationInfo, setReservationInfo] = useState({
        reservationId: '',
        email: '',
    });

    const handleChange = (e) => {
        setReservationInfo({ ...reservationInfo, [e.target.id]: e.target.value });
    };

    const handleCancel = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.delete('/cancel', {
                data: reservationInfo,
            });

            console.log(res.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Cancel Reservation</h2>
            <form onSubmit={handleCancel}>
                <label htmlFor="reservationId">Reservation ID:</label>
                <input type="text" id="reservationId" onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={handleChange} />

                <button type="submit">Cancel Booking</button>
            </form>
        </div>
    );
};

export default CancelBooking;
