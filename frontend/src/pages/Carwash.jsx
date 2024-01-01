import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/booking.css"
import StripeCheckout from 'react-stripe-checkout';
import smallCar from "../assets/car-sizes/sedan.svg"
import mediumCar from "../assets/car-sizes/suv-small.svg"
import largeCar from "../assets/car-sizes/suv-big.svg"
import x_largeCar from "../assets/car-sizes/x-large.svg"
// import { Link } from 'react-router-dom';
import { Button, Typography, Input } from '@material-tailwind/react'; //, Input
import { Calendar } from 'rsuite';
import { useUser } from '../context/userContext';
const Carwash = () => {
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
    const [vehiclePrice, setVehiclePrice] = useState();
    const accessToken = process.env.REACT_APP_STRIPE_ACCESS_TOKEN;
    // eslint-disable-next-line
    const accessTokenSms = process.env.REACT_APP_SEMAPHORE_ACCESS_TOKEN;
    const { _id } = useParams();
    const navigate = useNavigate()
    // console.log(vehiclePrice);
    // console.log(service._id);
    // console.log(user.data.name)
    const phone_number = user.data.tel
    // eslint-disable-next-line
    const phone = phone_number.toString()
    // eslint-disable-next-line
    const recipient = user.data.name

    // const payedService = service.vehiclePrice;
    // console.log(payedService)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.post(`https://q-zone-api.onrender.com/api/carwash/book/${_id}`)).data;
                setService(data);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [_id]);

    // const bookService = async (req, res) => {

    // }
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
                const result = await axios.post('https://q-zone-api.onrender.com/api/bookings/book-carwash', bookingDetails)
                // eslint-disable-next-line
                // const response = await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message', {
                //     apikey: accessTokenSms,
                //     number: `+${phone}`,
                //     message: `Hello ${recipient}! You are now Successfully Booked from Q-Zone Professional Detailers. Thank you for booking on us.\n\nAnd your payment of P${vehiclePrice * 0.20}.00 has been successfully processed on ${currentDate}.`,
                // });
                // console.log(response);
                // eslint-disable-next-line
                // const responseAdmin = await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message-admin', {
                //     apikey: accessTokenSms,
                //     number: `+639205746697`,
                //     message: `[Q-ZONE ONLINE]\n\n ${recipient} has successfully booked at ${selectedDate} ${selectedTime}. \n\nWith successfully paid of P${vehiclePrice * 0.20}.00.`,
                // });
                // console.log(responseAdmin);
                console.log(result)
                setLoading(false);
                setSuccess(true);
                document.body.style.cursor = "default";
                navigate("/profile")
            } catch (error) {
                setLoading(false);
                document.body.style.cursor = "default";
                console.log(error)
            }
        }
    };
    return (
        <section className='mb-20'>
            <h1 className='text-4xl mt-20 md:text-7xl font-bold mb-20 text-center'>Booking details</h1>
            <div className='booking-card mx-auto w-[320px] border-2 border-orange-500 py-5 px-2 rounded-lg sm:w-1/2 sm:px-10'>
                <h1 className='text-2xl mb-4 font-bold whitespace-nowrap text-center sm:text-left'>{service.title}</h1>
                <Typography color='orange' as="h1" className='text-center capitalize my-8 font-bold text-xl sm:text-3xl'>
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
                            <td className="text-gray-700">{service.small}</td>
                            <td className="text-gray-700">{service.medium}</td>
                            <td className="text-gray-700">{service.large}</td>
                            <td className="text-gray-700">{service.x_large}</td>

                        </tr>
                    </tbody>
                </table>
                <Typography color='orange' as="h1" className='text-3xl font-bold text-center capitalize my-8 text-xl sm:text-3xl'>
                    Select your vehicle type
                </Typography>
                <div className="flex justify-center items-center gap-2 sm:gap-8 mb-16">
                    <div>
                        <label htmlFor="small-car" className='relative'> <img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.small ? 'selected' : ''}`} src={smallCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>SMALL</h1></label>
                        <input type='radio' name='size' id='small-car' className='radio-size appearance-none' value={service.small} onChange={() => setVehiclePrice(service.small)}></input>
                    </div>
                    <div>
                        <label htmlFor="medium-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.medium ? 'selected' : ''}`} src={mediumCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>MEDIUM</h1></label>
                        <input type='radio' name='size' id='medium-car' className='radio-size appearance-none' value={service.medium} onChange={() => setVehiclePrice(service.medium)}></input>
                    </div>
                    <div>
                        <label htmlFor="large-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.large ? 'selected' : ''}`} src={largeCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>LARGE</h1></label>
                        <input type='radio' name='size' id='large-car' className='radio-size appearance-none' value={service.large} onChange={() => setVehiclePrice(service.large)}></input>
                    </div>
                    <div>
                        <label htmlFor="x-large-car" className='relative'><img className={`car-image rounded-full p-2 h-[60px] sm:h-[150px] w-[60px] sm:w-[150px] cursor-pointer ${vehiclePrice === service.x_large ? 'selected' : ''}`} src={x_largeCar} alt="car-size" /><h1 className='size-card-title text-black cursor-pointer text-xs sm:text-lg'>XLARGE</h1></label>
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
                    <h1><span className='font-bold text-orange-500'>Name : </span>{user.data.name}</h1>
                </div>
                <div className="mt-2">
                    <h1 className='text-md  font-bold'>Reservation Date : {selectedDate.toString()} at {selectedTime}</h1>

                </div>
                <div className='mt-6'>
                    <h1 className='text-lg font-bold text-orange-500'>Down Payment : P{vehiclePrice ? vehiclePrice * 0.20 : 0}.00</h1>
                </div>
                <StripeCheckout
                    disabled={selectedTime ? false : true}
                    amount={vehiclePrice * 100}
                    token={onToken}
                    currency='PHP'
                    stripeKey={accessToken}
                >
                    <Button className='mt-4' disabled={selectedTime ? false : true}>
                        {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                            Processing...</> : "Pay Now"}
                    </Button>
                </StripeCheckout>
                {error ? <div className='mt-2 text-red-900'>{errorMessage}</div> : <></>}
                {success ? <div className='mt-2 text-green-900'>Payment Success, and you are now booked.</div> : <></>}
            </div>
        </section>
    )
}

export default Carwash