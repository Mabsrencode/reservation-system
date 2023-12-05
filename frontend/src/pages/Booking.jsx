import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/booking.css"
// import { Link } from 'react-router-dom';
import { Button, Select, Option, Input } from '@material-tailwind/react'; //, Input
const Booking = () => {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState(false)
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila' };
    const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleString('en-US', options).split(',')[0]);
    const [vehicle, setVehicle] = useState();
    const handleSelectChange = (event) => {
        const selectedValue = event?.target?.value;
        setVehicle(selectedValue);
    };
    const handleClick = async () => {

    }
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
                setError(true)
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section className='mb-20'>
{loading ? <h1>loading...</h1> : <></>}
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
                    {/* last update */}
                    <Select label="Size of vehicle" onChange={handleSelectChange}>
                        <Option value={service.small}>SMALL</Option>
                        <Option value={service.medium}>MEDIUM</Option>
                        <Option value={service.large}>LARGE</Option>
                        <Option value={service.x_large}>X-LARGE</Option>
                    </Select>
                    <div className='mt-4'>
                        <Input type='date' label='Pick a date' id='date' onChange={(e) => { setSelectedDate(e.target.value) }}></Input>
                    </div>
                </div>
                <div className="mt-2">
                    <h1 className='text-sm  font-bold mb-20 '>Reservation Date: {selectedDate}</h1>
                </div>
                <div className='mt-10'>
                    <h1 className='text-lg font-bold text-orange-500'>Total: {vehicle}</h1>
                </div>
                <Button className='mt-4' onChange={handleClick}>
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
                {error ? <span>Something went wrong!</span> : <></>}
            </div>
        </section>
    )
}

export default Booking