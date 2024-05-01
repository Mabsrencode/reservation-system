import React, { useState, useEffect } from 'react';
import usePageMetadata from '../hooks/usePageMetaData';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import "../styles/booking.css"
import smallCar from "../assets/car-sizes/sedan.svg"
import mediumCar from "../assets/car-sizes/suv-small.svg"
import largeCar from "../assets/car-sizes/suv-big.svg"
import x_largeCar from "../assets/car-sizes/x-large.svg"
import { Button, Input, Typography } from '@material-tailwind/react'; //, Input
import { Calendar } from 'rsuite';
import { useUser } from '../context/userContext';
import OpenPaymentMethodModal from '../components/paymentMethodModal/OpenPaymentMethodModal';
import PesoSign from '../components/peso-sign/PesoSign';
const Booking = () => {
    usePageMetadata('Auto Detailing Page', 'This is the description for the Auto Detailing page.');
    const { user } = useUser();
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila' };
    const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleString('en-US', options).split(',')[0]);
    const [selectedTime, setSelectedTime] = useState("")
    const meridiem = selectedTime.split(":")[0]
    const [vehiclePrice, setVehiclePrice] = useState();
    const [count, setCount] = useState(5);
    const [redirect, setRedirect] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const accessToken = process.env.REACT_APP_STRIPE_ACCESS_TOKEN;
    const accessTokenSms = process.env.REACT_APP_SEMAPHORE_ACCESS_TOKEN;
    const { _id } = useParams();
    const navigate = useNavigate()
    const phone_number = user.data.tel
    const phone = phone_number.toString()
    const recipient = user.data.name
    const openPaymentModal = () => {
        setOpenPaymentMethod(!openPaymentMethod)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.post(`https://q-zone-api.onrender.com/api/auto-detailing/book/${_id}`)).data;
                setService(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [_id]);
    const onToken = async (token) => {
        setLoading(true);
        const user_id = user.data._id

        const bookingDetails = {
            service,
            user_id: user_id,
            selectedDate,
            selectedTime,
            vehiclePrice,
            token,
            userEmail: user.data.email,
            userName: user.data.name,
            userNumber: user.data.tel,
        }
        if (bookingDetails.service === "" || bookingDetails.user_id === "" || bookingDetails.selectedDate === "" || bookingDetails.selectedTime === "" || bookingDetails.vehiclePrice === "") {
            setError(true);
            setErrorMessage("Fill all the required field.")
        } else {
            try {
                setLoading(true);
                document.body.style.cursor = "wait";
                await axios.post('https://q-zone-api.onrender.com/api/bookings/book-service', bookingDetails)

                await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message', {
                    apikey: accessTokenSms,
                    number: `+${phone}`,
                    message: `[Q-ZONE ONLINE]\n\nHello ${recipient}! You are now Successfully Booked from Q-Zone Professional Detailers. Thank you for booking on us.\n\nAnd your payment of P${vehiclePrice * 0.20}.00 has been successfully processed on ${currentDate}.`,
                });


                await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message-admin', {
                    apikey: accessTokenSms,
                    number: `+639205746697`,
                    message: `[Q-ZONE ONLINE]\n\n ${recipient} has successfully booked at ${selectedDate} ${selectedTime}. \n\nWith successfully paid of P${vehiclePrice * 0.20}.00.`,
                });
                setLoading(false);
                setSuccess(true);
                document.body.style.cursor = "default";
                setRedirect(true);
                setTimeout(() => {
                    let currentCount = count;
                    const interval = setInterval(() => {
                        currentCount = currentCount - 1;
                        setCount(currentCount);
                        if (currentCount === 0) {
                            clearInterval(interval);
                            if (currentCount === 0) {
                                navigate("/profile")
                            }
                        }
                    }, 1000);
                });
            } catch (error) {
                setRedirect(false)
                document.body.style.cursor = "default";
                setLoading(false);
                console.log(error)
            }
        }
    };
    return (
        <section className='mb-20 px-1'>
            <h1 className='text-4xl mt-20 md:text-7xl font-bold mb-20 text-center'>Booking details</h1>
            <div className='booking-card w-full border-2 border-orange-500 py-5 px-2 rounded-lg lg:mx-auto lg:w-1/2 sm:px-10'>
                <h1 className='text-2xl mb-4 font-bold whitespace-nowrap text-center sm:text-left'>{service.title}</h1>
                <Typography color='orange' as="h1" className=' text-center capitalize my-8 font-bold text-xl sm:text-3xl'>
                    Price
                </Typography>
                <table className='text-center'>
                    <thead>
                        <tr>
                            <th className='text-center'>SMALL</th>
                            <th className='text-center'>MEDIUM</th>
                            <th className='text-center'>LARGE</th>
                            <th className='text-center whitespace-nowrap'>X-LARGE</th>
                        </tr>
                    </thead>
                    <tbody className='mt-20'>
                        <tr>
                            <td className="text-gray-700"><PesoSign />{service.small}.00</td>
                            <td className="text-gray-700"><PesoSign />{service.medium}.00</td>
                            <td className="text-gray-700"><PesoSign />{service.large}.00</td>
                            <td className="text-gray-700"><PesoSign />{service.x_large}.00</td>

                        </tr>
                    </tbody>
                </table>
                <Typography color='orange' as="h1" className='text-3xl font-bold text-center capitalize my-8 text-xl sm:text-3xl'>
                    Select your vehicle type
                </Typography>
                <div className="flex justify-center items-center gap-2 sm:gap-8 mb-16">
                    <div>
                        <label htmlFor="small-car" className='relative'> <img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.small ? 'selected' : ''}`} src={smallCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>SEDAN</h1></label>
                        <input type='radio' name='size' id='small-car' className='radio-size appearance-none' value={service.small} onChange={() => setVehiclePrice(service.small)}></input>
                    </div>
                    <div>
                        <label htmlFor="medium-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.medium ? 'selected' : ''}`} src={mediumCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>S SUV</h1></label>
                        <input type='radio' name='size' id='medium-car' className='radio-size appearance-none' value={service.medium} onChange={() => setVehiclePrice(service.medium)}></input>
                    </div>
                    <div>
                        <label htmlFor="large-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.large ? 'selected' : ''}`} src={largeCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>L SUV</h1></label>
                        <input type='radio' name='size' id='large-car' className='radio-size appearance-none' value={service.large} onChange={() => setVehiclePrice(service.large)}></input>
                    </div>
                    <div>
                        <label htmlFor="x-large-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.x_large ? 'selected' : ''}`} src={x_largeCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>VAN</h1></label>
                        <input type='radio' name='size' id='x-large-car' className='radio-size appearance-none' value={service.x_large} onChange={() => setVehiclePrice(service.x_large)}></input>
                    </div>
                </div>
                <Typography color='orange' as="h1" className='text-3xl font-bold text-center capitalize my-8 pt-8' style={{ borderTop: "1px solid white" }}>
                    Pick a date
                </Typography>
                <Calendar
                    bordered
                    cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)}
                    onChange={(value) => { setSelectedDate(value) }}
                    disabledDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
                <div className="w-72 mt-4">
                    <div className="mt-4">
                        <Input type='time' label='Pick a time' id='time' min={"09:00"} max={"18:00"} onChange={(e) => { setSelectedTime(e.target.value) }} required></Input>
                    </div>
                </div>
                <div className="mt-2">
                    <h1><span className='font-bold text-orange-500'>Name : </span>{user.data.name.toUpperCase()}</h1>
                </div>
                <div className="mt-2">
                    <h1 className='text-md font-bold'>Reservation Date : {moment(selectedDate).format('ll')} at {selectedTime} {meridiem > 11 ? "PM" : "AM"}</h1>
                </div>
                <div className='mt-6'>
                    <h1 className='text-lg font-bold text-orange-500'>Down Payment : <PesoSign />{vehiclePrice ? vehiclePrice * 0.20 : 0}.00</h1>
                    <span className='text-gray-700 text-sm'>The down payment is from the 20% of the service price.</span>
                </div>
                <Button className='mt-2' onClick={openPaymentModal}>Pay Now</Button>
                {error ? <div className='mt-2 text-red-900'>{errorMessage}</div> : <></>}
                {success ? <div className='mt-2 text-green-900'>Payment Success, and you are now booked.</div> : <></>}
            </div>
            <OpenPaymentMethodModal open={openPaymentMethod} setOpen={setOpenPaymentMethod} selectedTime={selectedTime} selectedDate={selectedDate} vehiclePrice={vehiclePrice} onToken={onToken} accessToken={accessToken} redirect={redirect} loading={loading} count={count} />
        </section >
    )
}

export default Booking