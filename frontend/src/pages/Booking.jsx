import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/booking.css"
// import { Link } from 'react-router-dom';
import { Button, Select, Option, Input } from '@material-tailwind/react'; //, Input
const Booking = () => {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.post('/api/services/book/:id')).data;
                setService(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section className='mb-20'>
            <h1 className='text-6xl mt-20 md:text-7xl font-bold mb-20 text-center'>Booking details</h1>
            <div className='booking-card mx-auto w-1/2 border-2 border-orange-500 py-5 px-10 rounded-lg'>
                <h1 className='text-2xl mb-4 font-bold'>{service.title}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>SMALL</th>
                            <th>MEDIUM</th>
                            <th>LARGE</th>
                            <th>X-LARGE</th>
                        </tr>
                    </thead>
                    <tbody className='mt-20'>
                        <tr>
                            <td className="text-gray-700">{service.small}</td>
                            <td className="text-gray-700">{service.medium}</td>
                            <td className="text-gray-700">{service.large}</td>
                            <td className="text-gray-700">{service.x_large}</td>

                        </tr>
                    </tbody>
                </table>
                <div className="w-72 mt-4">
                    <Select label="Size of vehicle">
                        <Option>SMALL</Option>
                        <Option>MEDIUM</Option>
                        <Option>LARGE</Option>
                        <Option>X-LARGE</Option>

                    </Select>
                    <div className='mt-4'>
                        <Input type='date' label='Pick a date' id='date'></Input>
                    </div>
                </div>
                <div>

                </div>
                <Button className='mt-4'>
                    Pay Now
                </Button>
            </div>
        </section>
    )
}

export default Booking